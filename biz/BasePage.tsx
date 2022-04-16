import * as ui from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import * as bsi from 'react-icons/bs'

const tabIndexByPathname = {
  '/': 0,
  '/yinjie': 1,
}

type TabKey = keyof typeof tabIndexByPathname

const BasePage: React.FC<{children: React.ReactNode}> = ({children}) => {
  const router = useRouter()
  const {pathname} = router

  return (
    <ui.Container maxW="6xl" px="0">
      <Head>
        <title>湘音 - 长沙话发音字典</title>
        <meta name="description" content="长沙话,湘语,正音,方音,注音" />
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
          px="4"
          variant="soft-rounded"
          index={tabIndexByPathname[pathname as TabKey]}
          onChange={() => {}}
        >
          <ui.TabList alignItems="center">
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
            <ui.Box ml="auto">
              <ui.Link
                isExternal
                href="https://github.com/ambar/xiangyin"
                aria-label="GitHub 源码与反馈"
                sx={{color: 'gray', transition: 'color .15s ease-in-out'}}
                _hover={{color: 'inherit'}}
              >
                <bsi.BsGithub size={20} />
              </ui.Link>
            </ui.Box>
          </ui.TabList>
        </ui.Tabs>
        <ui.Box p="4">{children}</ui.Box>
      </ui.Box>
    </ui.Container>
  )
}

export default BasePage
