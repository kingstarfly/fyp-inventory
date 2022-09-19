import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { Global, MantineProvider } from '@mantine/core'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'


const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
        <RedwoodApolloProvider>
          <Global
            styles={[
              {
                '@font-face': {
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  src: `local(''),
                url('../fonts/open-sans-v34-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                url('../fonts/open-sans-v34-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */`,
                },
              },
            ]}
          />
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ fontFamily: 'Open Sans' }}
          >
            <Routes />
          </MantineProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
