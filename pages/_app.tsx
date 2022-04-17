import {ChakraProvider, extendTheme, theme} from '@chakra-ui/react'
// 给 HTML 元素加上了 [data-focus-visible-added] hook，而 `@chakra-ui/css-reset` 识别了它，这样避免到处重置 outline 样式
import 'focus-visible'
import type {AppProps} from 'next/app'
import '../biz/polyfill'
import '../styles/globals.css'

/*
https://zh.m.wikipedia.org/wiki/宋体
- STSong：正常
- LiSongPro/LiSungLight：简体日常字缺失
- YuMincho/HiraMinProN-W3/HiraMinProN-W6：部分简体缺失，水平不齐
*/
let fontSerif = `STSong,SimSun,${theme.fonts.body}`
/** https://chakra-ui.com/docs/styled-system/theming/theme */
const customTheme = extendTheme({
  config: {
    // initialColorMode: 'light',
    // useSystemColorMode: true,
  },
  fonts: {
    body: fontSerif,
    heading: fontSerif,
    ipa: 'Doulos SIL, Arial',
  },
  styles: {
    global: {
      body: {
        '-webkit-font-smoothing': 'auto',
      },
    },
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
