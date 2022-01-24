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

  vec3 lmColor1 = vec3(1.0);
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
  bokeh -= smoothstep(0.0, 0.4, dist) * 0.5;

  float dimBias = 15.0; // Most bokeh should be dimmer
  float maxBrightness = mix(0.03, 1.0, pow(randBrightness, dimBias));
  float shimmer = smoothstep(0.0, 0.25, v_lifetime);
  shimmer *= smoothstep(1.0, 0.75, v_lifetime);
  shimmer *= 1.0 / (v_scale / 8.0);
  shimmer = clamp(shimmer, 0.0, maxBrightness);
  shimmer *= pow(v_altitude, 2.0);

  vec3 finalColor = pickedColor * bokeh * shimmer;
  gl_FragColor = vec4(finalColor, 1.0);
}
