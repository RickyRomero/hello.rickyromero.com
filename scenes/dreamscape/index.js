import { useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import ribbonsVertex from './ribbons.vs'
import ribbonsFragment from './ribbons.fs'

const RibbonsMaterial = shaderMaterial(
  { u_time: 0, u_color: new THREE.Color(0.2, 0.0, 0.1) },
  ribbonsVertex,
  ribbonsFragment
)

extend({ RibbonsMaterial })

const Box = (props) => {
  const box = useRef()
  const ribbon = useRef()

  useFrame((state, delta) => {
    box.current.rotation.x += 0.5 * delta
    box.current.rotation.y += 0.5 * delta
    box.current.rotation.z += 0.5 * delta
    ribbon.current.u_time += delta
  })

  return (
    <mesh {...props} ref={box}>
      <boxGeometry args={[1, 1, 1]} />
      <ribbonsMaterial ref={ribbon} />
    </mesh>
  )
}

const Bokeh = ({ children }) => {
  return (
    <>
      {children}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-0.9, 0, 0]} />
      <Box position={[0.9, 0, 0]} />
    </>
  )
}

export default Bokeh
