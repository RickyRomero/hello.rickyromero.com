import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import vertexShader from './expanse.vs'
import fragmentShader from './expanse.fs'

const width = 8
const depth = 8
const meshRes = 24

const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    cameraPosition: { value: new THREE.Vector3() },
    u_time: { value: 0 },
    u_speed: { value: 0.25 },
    u_dimensions: { value: new THREE.Vector2(width, depth) },
    u_lights: { value: 1.0 }
  },
  blending: THREE.AdditiveBlending,
  transparent: true
})
const plane = new THREE.PlaneGeometry(width, depth, width * meshRes, depth * meshRes)
plane.rotateX(-90 * Math.PI / 180)
plane.translate(0, -0.5, (-depth / 2) + 1)

const Expanse = props => {
  useFrame((_, delta) => {
    material.uniforms.u_time.value += delta
  })

  return <mesh geometry={plane} material={material} />
}

export default Expanse
