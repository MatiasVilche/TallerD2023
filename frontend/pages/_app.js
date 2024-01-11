import { ChakraProvider } from '@chakra-ui/react'
import Auth from '../components/authLogin';

function MyApp({ Component, pageProps }) {
  return (
    
    <ChakraProvider>
      <Auth/>
      <Component {...pageProps} />
    </ChakraProvider>
    
  )
}

export default MyApp