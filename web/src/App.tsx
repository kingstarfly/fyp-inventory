import './scaffold.css'
import './index.css'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { createEmotionCache, Global, MantineProvider } from '@mantine/core'
import { AuthProvider } from '@redwoodjs/auth'
import WebAuthnClient from '@redwoodjs/auth/webAuthn'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { Toaster } from '@redwoodjs/web/dist/toast'

const myCache = createEmotionCache({ key: 'mantine', prepend: false })

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth" client={WebAuthnClient}>
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
            emotionCache={myCache}
          >
            <Routes />
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: '',
                duration: 2000,

                // Default options for specific types
                success: {
                  duration: 2000,
                },
              }}
            />
          </MantineProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
