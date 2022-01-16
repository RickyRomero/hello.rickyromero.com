uniform float u_time;
uniform vec3 u_color;

varying vec2 v_uv;

void main() {
  gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(v_uv.yxx + u_time) + u_color, 1.0);
}
