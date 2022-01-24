import { Suspense, lazy, useState } from 'react'
import DynamicRes from 'components/dynamic-res.js'

const Canvas = lazy(() => import('lazy/canvas'))

const ThreeWrapper = ({ children }) => {
  const [pixelRatio, setPixelRatio] = useState(window.devicePixelRatio)

  return (
    <Suspense fallback={null}>
      <Canvas dpr={pixelRatio}>
        <DynamicRes pixelRatio={pixelRatio} onUpdate={ratio => setPixelRatio(ratio)} />
        {children}
      </Canvas>
    </Suspense>
  )
}

export default ThreeWrapper
