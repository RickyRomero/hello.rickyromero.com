import { Suspense, lazy, useState } from 'react'
import DynamicRes from 'components/dynamic-res.js'

const Canvas = lazy(() => import('lazy/canvas'))

const ThreeWrapper = ({ children }) => {
  const [pixelRatio, setPixelRatio] = useState(window.devicePixelRatio)
  const cameraOpts = {
    fov: 75,
    near: 0.001,
    far: 100,
    position: [0, 0, 5]
  }

  return (
    <Suspense fallback={null}>
      <Canvas dpr={pixelRatio} camera={cameraOpts}>
        <DynamicRes pixelRatio={pixelRatio} onUpdate={ratio => setPixelRatio(ratio)} />
        {children}
      </Canvas>
    </Suspense>
  )
}

export default ThreeWrapper
