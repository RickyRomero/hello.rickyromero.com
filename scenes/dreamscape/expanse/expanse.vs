precision mediump float;

#pragma glslify: noise = require('glsl-noise/simplex/2d')

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float u_time;
uniform float u_speed;

attribute vec3 position;
attribute vec2 uv;

varying float v_scaledTime;
varying vec3 v_position;
varying vec2 v_noiseCoords;
varying vec2 v_uv;

vec3 sphericalTransform(vec3 center, float radius, vec3 point) {
  return center + radius * (point.xyz - center) / length(point.xyz - center);
}

void main() {
  vec4 modelPosition;
  vec4 viewPosition;
  vec4 projectedPosition;

  float noiseOffset;
  vec3 sphereOffset;
  vec3 center;
  float radius;

  v_scaledTime = u_time * u_speed;
  radius = 4.0;
  modelPosition = modelMatrix * vec4(position, 1.0);
  v_noiseCoords = vec2(modelPosition.x, modelPosition.z - v_scaledTime);
  noiseOffset = noise(v_noiseCoords) / 4.0;
  modelPosition.y += noiseOffset;

  center = vec3(0.0, -radius, 0.0);
  sphereOffset = sphericalTransform(center, radius, modelPosition.xyz);
  modelPosition += vec4(sphereOffset.xyz, 0.0);

  viewPosition = viewMatrix * modelPosition;
  projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  v_position = modelPosition.xyz;
  v_uv = uv;
}
