import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import type {AppProps} from 'next/app'
import '../biz/polyfill'
import '../styles/globals.css'

/** https://chakra-ui.com/docs/styled-system/theming/theme */
const customTheme = extendTheme({
  config: {
    // initialColorMode: 'light',
    // useSystemColorMode: true,
  },
  fonts: {
    ipa: 'Doulos SIL, Arial',
  },
  styles: {
    global: {},
  },
})

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
