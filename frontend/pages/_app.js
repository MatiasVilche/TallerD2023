import { ChakraProvider } from '@chakra-ui/react'
import Auth from '../components/authLogin';
import '../CSS/sweetalert-overlay.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Auth/>
      <Component {...pageProps} />
    </ChakraProvider>
    
  )
}

export default MyApp