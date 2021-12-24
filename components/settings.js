import { createContext, useState } from 'react'

const mqSupported = query => {
  if (typeof window === 'undefined') { return false }

  const resolvedMq = window.matchMedia(query).media
  return query === resolvedMq
}

const SettingsCtx = createContext({
  system: {
    theme: 'light',
    contrast: 'normal',
    motion: 'rich'
  },
  user: {
    theme: 'system',
    contrast: 'system',
    motion: 'system'
  }
})

const SettingsDetector = props => {
  const { children } = props
  const themeMq = '(prefers-color-scheme)'
  const contrastMq = '(prefers-contrast)'
  const motionMq = '(prefers-reduced-motion)'
  const themeMqSpecific = '(prefers-color-scheme: dark)'
  const contrastMqSpecific = '(prefers-contrast: more)'
  const motionMqSpecific = '(prefers-reduced-motion: no-preference)'
  const theme = (
    mqSupported(themeMq) ? (
      window.matchMedia(themeMqSpecific).matches ? 'dark' : 'light'
    ) : 'light'
  )
  const contrast = (
    mqSupported(contrastMq) ? (
      window.matchMedia(contrastMqSpecific).matches ? 'high' : 'normal'
    ) : 'normal'
  )
  const motion = (
    mqSupported(motionMq) ? (
      window.matchMedia(motionMqSpecific).matches ? 'rich' : 'reduced'
    ) : 'rich'
  )

  const defaults = {
    theme: 'system',
    contrast: 'system',
    motion: 'system'
  }

  const [settingsData, setSettingsData] = useState({
    system: {
      theme: 'light',
      contrast: 'normal',
      motion: 'rich'
    },
    user: defaults
  })

  const settings = {
    data: settingsData,
    update: (scope, values) => {
      const updateData = { ...settingsData }
      updateData[scope] = {
        ...updateData[scope],
        ...values
      }
      setSettingsData(updateData)
    },
    reset: () => {
      settings.update('user', defaults)
    }
  }

  const updates = {}
  if (theme !== settings.data.system.theme) { updates.theme = theme }
  if (contrast !== settings.data.system.contrast) { updates.contrast = contrast }
  if (motion !== settings.data.system.motion) { updates.motion = motion }

  if (Object.keys(updates).length > 0) {
    console.log(JSON.stringify(updates))
    settings.update('system', updates)
  }

  return (
    <SettingsCtx.Provider value={settings}>
      {children}
    </SettingsCtx.Provider>
  )
}

export { SettingsCtx, SettingsDetector }
