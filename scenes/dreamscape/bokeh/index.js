import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import useLights from 'hooks/use-lights'
import { useReducedMotion } from 'hooks/use-media-query'
import useMotionRate from 'hooks/use-motion-rate'
import vertexShader from './bokeh.vert'
import fragmentShader from './bokeh.frag'

const particleCount = 2000
const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    u_time: { value: 0 },
    u_speed: { value: 1 },
    u_lights: { value: 1 }
  },
  blending: THREE.AdditiveBlending,
  side: THREE.DoubleSide,
  depthTest: false
})

const baseCircle = new THREE.CircleGeometry(0.005, 6)
const bokehCloud = new THREE.InstancedBufferGeometry()
bokehCloud.index = baseCircle.index
bokehCloud.attributes = baseCircle.attributes

const seeds = new Float32Array(particleCount)

for (let i = 0; i < particleCount; i++) {
  seeds[i] = Math.random()
}

bokehCloud.setAttribute('a_seed', new THREE.InstancedBufferAttribute(seeds, 1))

const Bokeh = () => {
  const lights = useLights()
  const reducedMotion = useReducedMotion() ? 0.2 : 1.0
  const motionRate = useMotionRate()

  useFrame((_, delta) => {
    material.uniforms.u_lights.value = lights.get()
    material.uniforms.u_time.value += delta * motionRate.get() * reducedMotion
  })

  return <mesh
    geometry={bokehCloud}
    material={material}
    position={[0, 0, -10]}
    frustumCulled={false}
  />
}

export default Bokeh
