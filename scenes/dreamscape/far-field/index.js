import { forwardRef, useMemo, useRef } from 'react'
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
  }
})
const plane = new THREE.PlaneGeometry(1, 1, 1, 1)

const FarFieldPlane = forwardRef((_, ref) => {
  const offscreen = useRef()
  const lights = useLights()
  const highContrast = useHighContrast() ? 2.0 : 1.0
  const reducedMotion = useReducedMotion() ? 0.2 : 1.0
  const motionRate = useMotionRate()
  const dynamicRange = [-(highContrast - 1) / 2, 1 + (highContrast - 1) / 2]

  const target = useMemo(() => (
    new THREE.WebGLRenderTarget(128, 256, {
      format: THREE.RGBAFormat,
      encoding: THREE.LinearEncoding
    })
  ), [])

  useFrame((state, delta) => {
    state.gl.setRenderTarget(target)
    material.uniforms.u_time.value += delta * motionRate.get() * reducedMotion
    material.uniforms.u_pitch.value = window.scrollY
    material.uniforms.u_lights.value = lerp(...dynamicRange, lights.get())
    state.gl.render(state.scene, offscreen.current)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      <orthographicCamera
        ref={offscreen}
        args={[-0.5, 0.5, 0.5, -0.5, 0.1, 10]}
        position={[0, 2000, 20]}
      />
      <mesh
        geometry={plane}
        material={material}
        position={[0, 2000, 19]}
        scale={[1, 1, 1]}
      />
      <mesh ref={ref} position={[0, 0, -10]}>
        <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          attach="material"
          map={target.texture}
          blending={THREE.AdditiveBlending}
          encoding={THREE.sRGBEncoding}
        />
      </mesh>
    </>
  )
})
FarFieldPlane.displayName = 'FarFieldPlane'

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

  return (
    <FarFieldPlane ref={field} />
  )
}

export default FarField
