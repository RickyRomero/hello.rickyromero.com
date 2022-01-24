import { useRef } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'

import vertexShader from './far-field.vs'
import fragmentShader from './far-field.fs'

const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    cameraPosition: { value: new THREE.Vector3() },
    u_time: { value: 0 },
    u_speed: { value: 0.1 },
    u_aspect: { value: 1 },
    u_lights: { value: 1 }
  },
  blending: THREE.AdditiveBlending
})
const plane = new THREE.PlaneGeometry(1, 1, 1, 1)

const FarField = () => {
  const field = useRef()

  useThree(({ camera }) => {
    if (!field.current) { return }

    const { aspect } = camera
    const distance = camera.position.distanceTo(field.current?.position)
    const vFov = THREE.Math.degToRad(camera.fov)
    const planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance
    const planeWidthAtDistance = planeHeightAtDistance * aspect

    field.current?.scale.set(planeWidthAtDistance, planeHeightAtDistance, 1)

    material.uniforms.u_aspect.value = aspect
  })

  useFrame((_, delta) => {
    material.uniforms.u_time.value += delta
  })

  return <mesh
    ref={field}
    geometry={plane}
    material={material}
    position={[0, 0, -10]}
  />
}

export default FarField
