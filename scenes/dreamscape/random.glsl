// Packages and code snippets exist that handle this. However on some
// systems, the input to their functions jitters slightly. Since they
// guarantee a unique output for every input, this magnifies the jitter
// and causes flashing and glitching.
// This is simply meant to generate high-frequency noise to literally
// smooth the problem over.

#pragma glslify: noise = require('glsl-noise/simplex/2d')

float random(vec2 co) {
  float baseNoise = noise(co * 10.0);
  float sawWave = mod(baseNoise, 0.1) * 10.0;
  float triangleWave = abs(sawWave - 0.5) * 2.0;
  return clamp(triangleWave, 0.0, 1.0);
}

#pragma glslify: export(random)
