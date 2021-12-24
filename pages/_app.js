import { SettingsDetector } from 'components/settings'

import 'styles/_variables.css'
import 'styles/_globals.css'

const App = ({ Component, pageProps }) => (
  <SettingsDetector>
    <Component {...pageProps} />
  </SettingsDetector>
)

export default App
