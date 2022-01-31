import { SettingsDetector } from 'components/settings'
import Home from 'pages/index.js'
import Project from 'pages/projects/[slug]'

import 'styles/_variables.css'
import 'styles/_globals.css'

const App = ({ Component, pageProps }) => {
  const instance = <Component {...pageProps} />
  const isSingleInstance = [Home, Project].includes(instance.type)

  return (
    <SettingsDetector>{
      isSingleInstance ? (
        <Home {...pageProps} />
      ) : instance
    }</SettingsDetector>
  )
}

export default App
