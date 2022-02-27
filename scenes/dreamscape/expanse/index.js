import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import useLights from 'hooks/use-lights'
import { useReducedMotion } from 'hooks/use-media-query'
import useMotionRate from 'hooks/use-motion-rate'
import vertexShader from './expanse.vert'
import fragmentShader from './expanse.frag'

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
    u_lights: { value: 1 }
  },
  blending: THREE.AdditiveBlending,
  transparent: true
})
const plane = new THREE.PlaneGeometry(width, depth, width * meshRes, depth * meshRes)
plane.rotateX(-90 * Math.PI / 180)
plane.translate(0, -0.5, (-depth / 2) + 1)

const Expanse = () => {
  const lights = useLights()
  const reducedMotion = useReducedMotion() ? 0.2 : 1.0
  const motionRate = useMotionRate(state => state.motionRate)()

  useFrame((_, delta) => {
    material.uniforms.u_lights.value = lights.get()
    material.uniforms.u_time.value += delta * motionRate.get() * reducedMotion
  })

  return <mesh geometry={plane} material={material} />
}

export default Expanse
