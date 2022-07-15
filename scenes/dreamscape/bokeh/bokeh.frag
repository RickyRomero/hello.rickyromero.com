precision highp float;

#pragma glslify: random = require('./scenes/dreamscape/random.glsl')

uniform float u_lights;

varying float v_altitude;
varying float v_lifetime;
varying float v_scale;
varying float v_seed;
varying vec2 v_uv;

void main() {
  float randColor = random(vec2(v_seed, v_altitude));
  float randBrightness = random(vec2(v_seed + 1.0, v_altitude));
  float shimmerReductionJitter = mix(0.5, 2.0, v_seed);
  float shimmerLowerBound = mix(0.6, 0.6, u_lights);
  float shimmerUpperBound = mix(1.0, 1.0, u_lights);
  float shimmerReduction = mix(160.0, 20.0, u_lights) * shimmerReductionJitter;
  float shimmer = random(vec2(v_seed, v_lifetime / shimmerReduction));
  shimmer = mix(shimmerLowerBound, shimmerUpperBound, shimmer);

  vec3 lmColor1 = vec3(1.3, 0.9, 0.35);
  vec3 dmColor1 = vec3(0.68, 0, 1);
  vec3 dmColor2 = vec3(0, 0.85, 1);
  vec3 dmColor3 = vec3(1, 0, 0.3) * 7.0;
  vec3 dmColor4 = vec3(1, 0.82, 0) * 10.0;
  vec3 dmColor5 = vec3(0.28, 1, 1) * 10.0;
  vec3 color1 = mix(dmColor1, lmColor1, u_lights);
  vec3 color2 = mix(dmColor2, lmColor1, u_lights);
  vec3 color3 = mix(dmColor3, lmColor1, u_lights);
  vec3 color4 = mix(dmColor4, lmColor1, u_lights);
  vec3 color5 = mix(dmColor5, lmColor1, u_lights);

  vec3 pickedColor = mix(color1, color2, smoothstep(0.0, 0.65, randColor));
  pickedColor = mix(pickedColor, color3, smoothstep(0.65, 0.70, randColor));
  pickedColor = mix(pickedColor, color4, smoothstep(0.85, 0.90, randColor));
  pickedColor = mix(pickedColor, color5, smoothstep(0.99, 1.0, randColor));

  float dist = distance(v_uv, vec2(0.5));
  float bokeh = smoothstep(0.43, 0.35, dist);
  bokeh -= smoothstep(0.4, 0.34, dist) * 0.3; // Outer halo
  bokeh -= smoothstep(0.34, 0.0, dist) * 0.075; // Inner dimming

  float dimBias = 15.0; // Most bokeh should be dimmer
  float maxBrightness = mix(0.03, 1.0, pow(randBrightness, dimBias));
  float baseBrightness = smoothstep(0.0, 0.25, v_lifetime);
  baseBrightness *= smoothstep(1.0, 0.75, v_lifetime);
  baseBrightness *= 1.0 / (v_scale / 8.0);
  baseBrightness = clamp(baseBrightness, 0.0, maxBrightness);
  baseBrightness *= pow(v_altitude, 2.0);

  vec3 finalColor = pickedColor * bokeh * baseBrightness * shimmer;
  gl_FragColor = vec4(finalColor, 1.0);
}
