import '../styles/globals.css'
import Providers from '../components/Providers'
import { Toaster } from '../components/ui/toast'


function MyApp({ Component, pageProps }) {


  return (

    <Providers>
      <Toaster position='bottom-right' />

      <Component {...pageProps} />
    </Providers>

  )
}

export default MyApp
