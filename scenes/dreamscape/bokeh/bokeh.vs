precision highp float;

#pragma glslify: random = require('glsl-random')

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_time;
uniform float u_speed;
uniform float u_lights;

attribute vec3 position;
attribute vec2 uv;
attribute float a_seed;

varying float v_lifetime;
varying float v_scale;
varying float v_seed;
varying float v_altitude;
varying vec2 v_uv;

void main() {
  float periodLength = 8.0;
  float driftRange = 10.0;
  float bokehSize = mix(100.0, 50.0, u_lights); // Gotta open the lens more in low light
  float minBokehSize = 5.0;

  float scaledTime = u_time * u_speed;
  float localPeriod = scaledTime + (a_seed * periodLength);
  float periodNumber = floor(localPeriod / periodLength);
  float periodTime = mod(localPeriod, periodLength);
  float periodPct = periodTime / periodLength;

  float spawnDepth = mix(0.0, 8.0, random(vec2(a_seed + 2.0, periodNumber)));
  float driftSpeed = mix(2.0, driftRange-spawnDepth, random(vec2(a_seed, periodNumber)));
  vec3 translate = vec3(
    mix(-1.0, 1.0, random(vec2(a_seed, periodNumber))) * 14.0,
    mix(-1.0, 1.0, random(vec2(a_seed + 1.0, periodNumber))) * 3.0,
    spawnDepth + periodPct * driftSpeed
  ) * 1.0;

  float linearScale = translate.z / driftRange;
  float expoScale = 1.0 - pow(linearScale, 4.0);
  float scale = minBokehSize + expoScale * bokehSize;

  vec4 mvPosition = modelViewMatrix * vec4(translate, 1.0);
  mvPosition.xyz += position * scale;

  gl_Position = projectionMatrix * mvPosition;
  v_altitude = smoothstep(-1.5, 1.5, translate.y);
  v_lifetime = periodPct;
  v_scale = scale;
  v_seed = a_seed;
  v_uv = uv;
}
