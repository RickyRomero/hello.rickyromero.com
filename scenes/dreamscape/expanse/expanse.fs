precision mediump float;

#pragma glslify: noise = require('glsl-noise/simplex/2d')

uniform mat4 modelMatrix;
uniform vec3 cameraPosition;
uniform vec2 u_dimensions;
uniform float u_lights;

varying float v_scaledTime;
varying vec3 v_position;
varying vec2 v_noiseCoords;
varying vec2 v_uv;

#define FUDGE 6.0

// It's not possible to recalculate normals modified in a vertex shader,
// so we're faking the effect with the same noise generator used in the
// vertex shader.
// Hat tip to Tim Romero (@phort99) for helping me out here
vec3 fudgedNormal(float noisePoint) {
  vec2 noiseNeighbor = vec2(
    noise(v_noiseCoords + vec2(0.01, 0.00)),
    noise(v_noiseCoords + vec2(0.00, 0.01))
  );

  vec3 normal = vec3(0.0, 1.0, 0.0);
  vec3 normalOffset = vec3(noisePoint - noiseNeighbor.xy, 0.0) * FUDGE;
  return normalize(normal + normalOffset);
}

vec3 baseLight(vec3 normal) {
  float lightFalloff = mix(64.0, 48.0, u_lights);
  float lightStrength = 1.0;
  vec3 lightColor = vec3(mix(0.025, 0.05, u_lights));
  vec3 lightPosition = vec3(0.0, 4.0, -1.0);

  vec3 worldPosition = (modelMatrix * vec4(v_position, 1.0)).xyz;
  vec3 worldNormal = normalize(vec3(modelMatrix * vec4(normal, 0.0)));
  vec3 viewVector = normalize(lightPosition - worldPosition);

  float rimndotv = max(0.0, lightStrength * clamp(dot(worldNormal, viewVector), 0.0, 1.0));

  return lightColor * pow(rimndotv, lightFalloff);
}

vec3 rimLight(vec3 normal) {
  float rimStrength = 4.0;
  float rimWidth = 0.25;
  vec3 rimColor = mix(vec3(0.01, 0.0, 0.2), vec3(0.5), u_lights);
  vec3 worldPosition = (modelMatrix * vec4(v_position, 1.0)).xyz;

  vec3 worldNormal = normalize(vec3(modelMatrix * vec4(normal, 0.0)));
  vec3 viewVector = normalize(cameraPosition + vec3(0.0, 0.2, 0.3) - worldPosition);

  float rimndotv = max(0.0, rimWidth - clamp(dot(worldNormal, viewVector), 0.0, 1.0));

  return rimndotv * rimColor * rimStrength;
}

vec3 dotGrid() {
  float shrink = 50.0;
  vec2 aspectUv = u_dimensions * v_uv * shrink;
  vec2 offsetUv = fract(vec2(aspectUv.t + v_scaledTime * shrink, aspectUv.s));
  vec2 dotCoords = (offsetUv - 0.5) * 4.0;
  float renderedDots = step(0.6, 1.0 - distance(offsetUv, dotCoords));
  float halos = smoothstep(0.0, 0.6, 1.0 - distance(offsetUv, dotCoords)) * 0.4;
  float lightMotion = noise(vec2((aspectUv.t - v_scaledTime * shrink * 2.0) / shrink, floor(aspectUv.s)));
  float lightValue = (halos + renderedDots) * smoothstep(-0.5, 0.5, lightMotion);
  return vec3(lightValue);
}

float contours(float noisePoint) {
  return step(0.049, mod(noisePoint, 0.05)) * 0.4;
}

void main() {
  float noisePoint = noise(v_noiseCoords);
  vec3 normal = fudgedNormal(noisePoint);
  vec3 base = baseLight(normal);
  vec3 rim = rimLight(normal);
  vec3 dots = dotGrid() * mix(10.0, 1.0, u_lights);
  dots = dots * mix(vec3(v_uv * 2.0, 0.5), vec3(1.0), u_lights);
  vec3 lighting = base + rim;

  float cameraDistance = distance(v_uv, vec2(0.5, 0.0));
  float visibility = smoothstep(0.5, 0.3, cameraDistance);

  gl_FragColor = vec4(visibility * (lighting + (dots * lighting * 10.0)), 1.0);
}
