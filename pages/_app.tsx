import {ChakraProvider, extendTheme} from '@chakra-ui/react'
// 给 HTML 元素加上了 [data-focus-visible-added] hook，而 `@chakra-ui/css-reset` 识别了它，这样避免到处重置 outline 样式
import 'focus-visible'
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
