precision mediump float;

#pragma glslify: noise = require('glsl-noise/simplex/3d')
#define PI 3.1415926535

uniform float u_aspect;
uniform float u_time;
uniform float u_speed;
uniform float u_lights;

varying vec2 v_uv;

vec3 backgroundBlur(vec3 lightColor, vec3 deepColor, vec2 uv, float time) {
  vec3 baseBlur = smoothstep(-0.5, 0.5, vec3(noise(vec3(uv * 0.5, time))));
  vec3 detailBlur = vec3(noise(vec3(uv * vec2(1.25, 3.0), time)));
  vec3 combinedBlur = detailBlur * baseBlur;
  combinedBlur = mix(deepColor, lightColor, combinedBlur);
  combinedBlur = mix(combinedBlur, lightColor, uv.t);
  combinedBlur = mix(combinedBlur, deepColor, (1.0 - uv.t));
  combinedBlur -= smoothstep(0.3, 3.0, distance(vec2(0.5, 0.5), uv));
  return combinedBlur;
}

vec3 lightRays(vec2 uv, float time) {
  vec3 lmRayColor = vec3(1.0);
  vec3 dmRayColor = vec3(0, 0.97, 1) * 2.0;
  vec3 rayColor = mix(dmRayColor, lmRayColor, u_lights);

  float toRad = PI / 180.0;
  float rayAngle = 170.0 * toRad;
  float sweep = 50.0 * toRad;
  vec2 raySource = vec2(0.5, -2.5);
  vec2 rayOffset = uv + raySource;
  float radial = PI + atan(-rayOffset.s, -rayOffset.t);

  float rawRays = smoothstep(-1.0, 1.0, noise(vec3(vec2(radial * 10.0), time)));
  float maskLeft = smoothstep(rayAngle + sweep * 0.5, rayAngle + sweep * 0.25, radial);
  float maskRight = smoothstep(rayAngle - sweep * 0.5, rayAngle - sweep * 0.25, radial);
  float mask = maskLeft * maskRight;
  float rays = mask * rawRays;
  float attenuatedRays = mix(0.0, rays, uv.t);

  float glow = smoothstep(3.0, 2.0, distance(-raySource, uv)) * mask;
  float combined = smoothstep(0.0, 2.0, attenuatedRays + glow);

  return combined * rayColor;
}

void main() {
  vec3 lmLightColor = vec3(0.81, 0.93, 1.0);
  vec3 dmLightColor = vec3(0.09, 0.06, 0.45);
  vec3 lmDeepColor = vec3(0.32, 0.75, 1.0);
  vec3 dmDeepColor = vec3(0.03, 0, 0.11);
  vec3 dmGlowColor = vec3(1, 0, 0.3);

  float uvOffset = (u_aspect - 1.0) / 2.0;
  vec2 aspectUv = vec2((v_uv.s * u_aspect) - uvOffset, v_uv.t);
  float scaledTime = u_time * u_speed;

  vec3 lightColor = mix(dmLightColor, lmLightColor, u_lights);
  vec3 deepColor = mix(dmDeepColor, lmDeepColor, u_lights);
  vec3 blur = backgroundBlur(lightColor, deepColor, aspectUv, scaledTime);

  vec3 sweetBabyRays = lightRays(aspectUv, scaledTime);
  float dmGlowStrength = smoothstep(3.0, 0.0, distance(vec2(1.0, 0.0), aspectUv));
  dmGlowStrength = mix(dmGlowStrength * 0.15, 0.0, u_lights);
  vec3 dmGlow = dmGlowColor * dmGlowStrength;

  gl_FragColor = vec4(dmGlow + blur + sweetBabyRays * 0.2, 1.0);
}
