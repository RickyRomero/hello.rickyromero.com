import { MotionConfig } from 'framer-motion'

import Home from 'pages/index.js'
import Project from 'pages/projects/[slug]'

import useMotionRate from 'hooks/use-motion-rate'
import Metadata from 'components/metadata'

import 'styles/_variables.css'
import 'styles/_globals.css'

const MotionRateHost = () => { useMotionRate.use(); return null }

const App = ({ Component, pageProps }) => {
  const metadata = pageProps.activeProject?.metadata || {}
  const pageType = pageProps.activeProject ? 'article' : 'website'
  const title = metadata.title
    ? `${metadata.title} - Ricky Romero`
    : 'Ricky Romero: Design + Code'
  const description = metadata.description ||
    "My name's Ricky. I design and code. Let's build something incredible."
  const preview = metadata.preview ||
    'home.jpg'

  const instance = <Component {...pageProps} />
  const isSingleInstance = [Home, Project].includes(instance.type)

  return (
    <>
      <Metadata
        type={pageType}
        title={title}
        description={description}
        preview={`${process.env.BASEURL}/previews/${preview}`}
      />
      { isSingleInstance ? (
        <MotionConfig reducedMotion="user">
          <MotionRateHost />
          <Home {...pageProps} />
        </MotionConfig>
      ) : instance}
    </>
  )
}

export default App
