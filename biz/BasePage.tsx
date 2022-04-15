import * as ui from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'

const tabIndexByPathname = {
  '/': 0,
  '/yinjie': 1,
}

type TabKey = keyof typeof tabIndexByPathname

const BasePage: React.FC<{children: React.ReactNode}> = ({children}) => {
  const router = useRouter()
  const {pathname} = router

  return (
    <ui.Container maxW="6xl" px="1">
      <Head>
        <title>湘音 - 长沙话方音字典</title>
        <meta name="description" content="湘语,正音,长沙话" />
        <link
          rel="icon"
          sizes="any"
          type="image/svg+xml"
          href="/favicon/xiang.svg"
        />
        <link
          rel="icon"
          sizes="32x32"
          type="image/png"
          href="/favicon/xiang32h.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/xiang180h.png"
        />
      </Head>

      <ui.Box pt="4">
        <ui.Tabs
          variant="soft-rounded"
          index={tabIndexByPathname[pathname as TabKey]}
          onChange={() => {}}
        >
          <ui.TabList>
            <Link passHref href="/">
              <ui.Tab as="a" _hover={{boxShadow: 'none'}}>
                注音
              </ui.Tab>
            </Link>
            <Link passHref href="/yinjie">
              <ui.Tab as="a" _hover={{boxShadow: 'none'}}>
                音节表
              </ui.Tab>
            </Link>
          </ui.TabList>
        </ui.Tabs>
        <ui.Box p="4">{children}</ui.Box>
      </ui.Box>
    </ui.Container>
  )
}

export default BasePage
