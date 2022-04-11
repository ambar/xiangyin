import * as ui from '@chakra-ui/react'
import type {NextPage} from 'next'
import Head from 'next/head'
import Zhuyin from '../biz/Zhuyin'

const Home: NextPage = () => {
  return (
    <ui.Container maxW="6xl" px="1">
      <Head>
        <title>湘音</title>
        <meta name="description" content="湘音,乡音,长沙话" />
        <link
          rel="icon"
          sizes="any"
          type="image/svg+xml"
          href="/xiang.svg"
        ></link>
      </Head>

      <Zhuyin />
    </ui.Container>
  )
}

export default Home
