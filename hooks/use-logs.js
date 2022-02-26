import { useEffect, useState } from 'react'
import { createHook } from 'hookleton'

const useLogs = createHook(() => {
  const [gpuLogged, setGpuLogged] = useState(false)
  const [target, logTarget] = useState()
  const [fps, logFps] = useState()
  const [fpsCeiling, logFpsCeiling] = useState()
  const [dsRes, logDsRes] = useState()

  useEffect(() => {
    if (!target) { return }
    if (target === '#gpu' && (!fps || !fpsCeiling || !dsRes)) { return }
    if (target === '#gpu' && gpuLogged) { return }
    if (target === '#gpu') { setGpuLogged(true) }

    const w = window.innerWidth
    const h = window.innerHeight
    const dpr = window.devicePixelRatio
    const viewport = `${w} x ${h} @ ${dpr}`
    const data = {
      client: { viewport, fps, fpsCeiling, dsRes },
      entry: { target }
    }

    fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }, [target, fps, fpsCeiling, dsRes])

  return [logTarget, logFps, logFpsCeiling, logDsRes]
})

export default useLogs
