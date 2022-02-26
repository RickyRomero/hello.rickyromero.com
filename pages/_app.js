import { MotionConfig } from 'framer-motion'

import Home from 'pages/index.js'
import Project from 'pages/projects/[slug]'
import useDreamscapeOpacity from 'hooks/use-dreamscape-opacity'
import useLogs from 'hooks/use-logs'
import useMotionRate from 'hooks/use-motion-rate'

import 'styles/_variables.css'
import 'styles/_globals.css'

const DreamscapeOpacityHost = () => { useDreamscapeOpacity.use(); return null }
const LogsHost = () => { useLogs.use(); return null }
const MotionRateHost = () => { useMotionRate.use(); return null }

const App = ({ Component, pageProps }) => {
  const instance = <Component {...pageProps} />
  const isSingleInstance = [Home, Project].includes(instance.type)

  return (
    isSingleInstance ? (
      <MotionConfig reducedMotion="user">
        <DreamscapeOpacityHost />
        <LogsHost />
        <MotionRateHost />
        <Home {...pageProps} />
      </MotionConfig>
    ) : instance
  )
}

export default App
