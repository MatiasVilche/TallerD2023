import { ChakraProvider,extendTheme } from '@chakra-ui/react'
import Auth from '../components/authLogin';
import '../CSS/sweetalert-overlay.css';
import '../styles/globals.css';

const theme = extendTheme({
  styles: {
     global: {
       html: {
         height: "100%",
       },
       body: {
         height: "100%",
         margin: 0,
         padding: 0,
         bgGradient: "linear(to-r, #007bff, #8a2be2)",
       },
     },
  },
 });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Auth/>
      <Component {...pageProps} />
    </ChakraProvider>
    
  )
}

export default MyApp