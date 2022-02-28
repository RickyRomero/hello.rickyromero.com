import { MotionConfig } from 'framer-motion'

import Home from 'pages/index.js'
import Project from 'pages/projects/[slug]'
import useMotionRate from 'hooks/use-motion-rate'

import 'styles/_variables.css'
import 'styles/_globals.css'

const MotionRateHost = () => { useMotionRate.use(); return null }

const App = ({ Component, pageProps }) => {
  const instance = <Component {...pageProps} />
  const isSingleInstance = [Home, Project].includes(instance.type)

  return (
    isSingleInstance ? (
      <MotionConfig reducedMotion="user">
        <MotionRateHost />
        <Home {...pageProps} />
      </MotionConfig>
    ) : instance
  )
}

export default App
