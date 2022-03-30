import create from 'zustand'

const useLogs = create((set, get) => ({
  dsRes: null,
  fps: null,
  fpsCeiling: null,
  gpuLogged: false,
  referrer: null,

  logEntry: ({ target, ...client }) => {
    set(client)
    const { gpuLogged, fps, fpsCeiling, dsRes, referrer } = get()

    if (target === '#gpu' && (!fps || !fpsCeiling || !dsRes)) { return }
    if (target === '#gpu' && gpuLogged) { return }
    if (target === '#gpu') { set({ gpuLogged: true }) }

    const w = window.innerWidth
    const h = window.innerHeight
    const dpr = window.devicePixelRatio
    const viewport = `${w} x ${h} @ ${dpr}`
    const data = {
      client: { viewport, fps, fpsCeiling, dsRes, referrer },
      entry: { target }
    }

    fetch('/api/log', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
  }
}))

export default useLogs
