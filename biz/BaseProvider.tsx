import {ChakraProvider, extendTheme, theme} from '@chakra-ui/react'
// 给 HTML 元素加上了 [data-focus-visible-added] hook，而 `@chakra-ui/css-reset` 识别了它，这样避免到处重置 outline 样式
import 'focus-visible'
import type {AppProps} from 'next/app'
import './polyfill'
import '../styles/globals.css'

// 对字典中扩展区 B~G 的汉字应用自定义字体
const extFonts = `HanaSubset,BabelStoneHanSubset`

/** https://chakra-ui.com/docs/styled-system/theming/theme */
const customTheme = extendTheme({
  config: {
    // initialColorMode: 'light',
    // useSystemColorMode: true,
  },
  fonts: {
    body: `${extFonts},${theme.fonts.body}`,
    heading: `${extFonts},${theme.fonts.heading}`,
    ipa: 'Doulos SIL, Arial',
  },
  styles: {
    global: {},
  },
})

export default function BaseProvider({children}: {children: React.ReactNode}) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}
