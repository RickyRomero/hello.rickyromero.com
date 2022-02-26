import { Suspense, lazy, useState } from 'react'

import DynamicRes from 'components/dynamic-res'
import FpsDetect from 'components/fps-detect'
import useLogs from 'hooks/use-logs'

const Canvas = lazy(() => import('lazy/canvas'))

const ThreeWrapper = ({ children }) => {
  const [logTarget, , logFpsCeiling, logDsRes] = useLogs()
  const [pixelRatio, setPixelRatio] = useState(0.05)
  const [fpsCeiling, setFpsCeiling] = useState(null)

  const fpsCeilingDetected = max => {
    setFpsCeiling(max)
    setPixelRatio(window.devicePixelRatio)

    logDsRes(window.devicePixelRatio)
    logFpsCeiling(max)
    logTarget('#gpu')
  }

  const updatePixelRatio = ratio => {
    setPixelRatio(ratio)

    logDsRes(ratio)
    logTarget('#gpu')
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
                onUpdate={updatePixelRatio}
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
