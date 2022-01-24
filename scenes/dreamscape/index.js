import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

import Bokeh from './bokeh'
import Expanse from './expanse'
import FarField from './far-field'

const Dreamscape = ({ children }) => {
  return (
    <>
      {children}
      <group>
        <PerspectiveCamera makeDefault />
        <FarField position={[0, 0, -10]} />
      </group>
      <Bokeh />
      <Expanse />
    </>
  )
}

export default Dreamscape
