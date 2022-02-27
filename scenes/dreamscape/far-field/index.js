import { useRef } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'

import useLights from 'hooks/use-lights'
import { useHighContrast, useReducedMotion } from 'hooks/use-media-query'
import useMotionRate from 'hooks/use-motion-rate'
import vertexShader from './far-field.vert'
import fragmentShader from './far-field.frag'

const lerp = (a, b, t) => (1 - t) * a + t * b

const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    cameraPosition: { value: new THREE.Vector3() },
    u_time: { value: 0 },
    u_speed: { value: 0.1 },
    u_aspect: { value: 1 },
    u_pitch: { value: 0 },
    u_lights: { value: 1 }
  },
  blending: THREE.AdditiveBlending
})
const plane = new THREE.PlaneGeometry(1, 1, 1, 1)

const FarField = () => {
  const lights = useLights()
  const highContrast = useHighContrast() ? 2.0 : 1.0
  const reducedMotion = useReducedMotion() ? 0.2 : 1.0
  const motionRate = useMotionRate(state => state.motionRate)()
  const field = useRef()
  const dynamicRange = [-(highContrast - 1) / 2, 1 + (highContrast - 1) / 2]

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
    material.uniforms.u_time.value += delta * motionRate.get() * reducedMotion
    material.uniforms.u_pitch.value = window.scrollY
    material.uniforms.u_lights.value = lerp(...dynamicRange, lights.get())
  })

  return <mesh
    ref={field}
    geometry={plane}
    material={material}
    position={[0, 0, -10]}
  />
}

export default FarField
