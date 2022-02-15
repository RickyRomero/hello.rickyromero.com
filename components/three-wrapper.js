import { Suspense, lazy, useState } from 'react'

import DynamicRes from 'components/dynamic-res'
import FpsDetect from 'components/fps-detect'

const Canvas = lazy(() => import('lazy/canvas'))

const ThreeWrapper = ({ children }) => {
  const [pixelRatio, setPixelRatio] = useState(0.05)
  const [fpsCeiling, setFpsCeiling] = useState(null)

  const fpsCeilingDetected = max => {
    setFpsCeiling(max)
    setPixelRatio(window.devicePixelRatio)
  }

  return (
    <Suspense fallback={null}>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas dpr={pixelRatio}>
          {!fpsCeiling ? (
            <FpsDetect onDetect={fpsCeilingDetected} />
          ) : (
            <>
              <DynamicRes
                fpsTarget={fpsCeiling}
                pixelRatio={pixelRatio}
                onUpdate={ratio => setPixelRatio(ratio)}
              />
              {children}
            </>
          )}
        </Canvas>
      </div>
    </Suspense>
  )
}

export default ThreeWrapper
