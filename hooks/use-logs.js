import create from 'zustand'

const useLogs = create((set, get) => ({
  gpuLogged: false,
  fps: null,
  fpsCeiling: null,
  dsRes: null,

  logEntry: ({ target, ...client }) => {
    set(client)
    const { gpuLogged, fps, fpsCeiling, dsRes } = get()

    if (target === '#gpu' && (!fps || !fpsCeiling || !dsRes)) { return }
    if (target === '#gpu' && gpuLogged) { return }
    if (target === '#gpu') { set({ gpuLogged: true }) }

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
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
  }
}))

export default useLogs
