import { useCallback, useEffect, useState } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'

import Bokeh from './bokeh'
import Expanse from './expanse'
import FarField from './far-field'
import { useFrame } from '@react-three/fiber'

const RenderHalt = () => useFrame(() => null, 1000)

const Dreamscape = ({ children }) => {
  const [renderActive, setRenderActive] = useState(true)
  const cameraSetup = useCallback(camGroup => {
    // TODO: tie this to scroll offset and mouse position
    const angle = THREE.Math.degToRad(-10)
    const rotation = new THREE.Euler(angle, 0, 0, 'XYZ')
    camGroup?.position.set(0, 0.1, 1)
    camGroup?.setRotationFromEuler(rotation)
  }, [])

  // Stop animation after a specified scroll threshold
  // TODO: Define this without using a magic number
  useEffect(() => {
    const handleScroll = () => setRenderActive(window.scrollY < 2000)
    const handleVis = () => setRenderActive(document.visibilityState === 'visible')

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('visibilitychange', handleVis)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVis)
    }
  }, [])

  return (
    <>
      {children}
      <group ref={cameraSetup}>
        <PerspectiveCamera makeDefault fov={75} near={0.001} far={100} />
        <FarField position={[0, 0, -10]} />
      </group>
      <Bokeh />
      <Expanse />
      { renderActive ? null : <RenderHalt /> }
    </>
  )
}

export default Dreamscape
