import Home from 'pages/index.js'
import Project from 'pages/projects/[slug]'

import 'styles/_variables.css'
import 'styles/_globals.css'

const App = ({ Component, pageProps }) => {
  const instance = <Component {...pageProps} />
  const isSingleInstance = [Home, Project].includes(instance.type)

  return (
    isSingleInstance ? (
      <Home {...pageProps} />
    ) : instance
  )
}

export default App
