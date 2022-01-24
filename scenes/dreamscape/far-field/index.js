import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

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
    u_lights: { value: 1.0 }
  },
  blending: THREE.AdditiveBlending
})
const plane = new THREE.PlaneGeometry(1, 1, 1, 1)

const FarField = props => {
  const field = useRef()

  useFrame(({ camera }, delta) => {
    // if (field.current) {
    //   console.log('field ready')
    //   console.dir(field.current)
    //   debugger
    // }

    const { aspect } = camera
    const distance = camera.position.distanceTo(field.current?.position)
    const vFov = THREE.Math.degToRad(camera.fov)
    const planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance
    const planeWidthAtDistance = planeHeightAtDistance * aspect

    field.current?.scale.set(planeWidthAtDistance, planeHeightAtDistance, 1)

    material.uniforms.u_aspect.value = window.innerWidth / window.innerHeight
  })

  return <mesh
    ref={field}
    geometry={plane}
    material={material}
    position={[0, 0, -10]}
  />
}

export default FarField
