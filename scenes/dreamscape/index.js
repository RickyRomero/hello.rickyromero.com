import { useCallback } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'

import Bokeh from './bokeh'
import Expanse from './expanse'
import FarField from './far-field'

const Dreamscape = ({ children }) => {
  const cameraSetup = useCallback(camGroup => {
    // TODO: tie this to scroll offset and mouse position
    const angle = THREE.Math.degToRad(-10)
    const rotation = new THREE.Euler(angle, 0, 0, 'XYZ')
    camGroup?.position.set(0, 0.1, 1)
    camGroup?.setRotationFromEuler(rotation)
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
    </>
  )
}

export default Dreamscape
