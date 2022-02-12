import { Suspense, lazy, useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

import DynamicRes from 'components/dynamic-res'
import FpsDetect from 'components/fps-detect'

const Canvas = lazy(() => import('lazy/canvas'))

const ThreeWrapper = ({ sceneStarted, children }) => {
  const [pixelRatio, setPixelRatio] = useState(0.05)
  const [fpsCeiling, setFpsCeiling] = useState(null)
  const fade = useSpring(0, { damping: 1, stiffness: 1 })

  const fpsCeilingDetected = max => {
    setFpsCeiling(max)
    setPixelRatio(window.devicePixelRatio)
  }

  useEffect(() => { sceneStarted && fade.set(1) }, [sceneStarted])

  return (
    <Suspense fallback={null}>
      <motion.div style={{ width: '100vw', height: '100vh', opacity: fade }}>
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
      </motion.div>
    </Suspense>
  )
}

export default ThreeWrapper
