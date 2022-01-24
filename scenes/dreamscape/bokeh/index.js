import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import vertexShader from './bokeh.vs'
import fragmentShader from './bokeh.fs'

const particleCount = 1600
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
  useFrame((_, delta) => {
    material.uniforms.u_time.value += delta
  })

  return <mesh
    geometry={bokehCloud}
    material={material}
    position={[0, 0, -10]}
  />
}

export default Bokeh
