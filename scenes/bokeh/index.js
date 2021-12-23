import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Box = (props) => {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x += 0.005
    ref.current.rotation.y += 0.005
    ref.current.rotation.z += 0.005
  })

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'skyblue'} />
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
