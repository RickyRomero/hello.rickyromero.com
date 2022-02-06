precision mediump float;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 v_uv;

void main() {
  vec4 modelPosition;
  vec4 viewPosition;
  vec4 projectedPosition;

  modelPosition = modelMatrix * vec4(position, 1.0);
  viewPosition = viewMatrix * modelPosition;
  projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  v_uv = uv;
}
