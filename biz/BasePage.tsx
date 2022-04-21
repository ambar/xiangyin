import * as ui from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import * as bsi from 'react-icons/bs'
import ZhuyinMenu, {ZhuyinSettingsProvider} from './ZhuyinMenu'

const tabIndexByPathname = {
  '/': 0,
  '/yinjie': 1,
  '/guanyu': 2,
}

type TabKey = keyof typeof tabIndexByPathname

const BasePage: React.FC<{children: React.ReactNode}> = ({children}) => {
  const router = useRouter()
  const {pathname} = router
  const tabIndex = tabIndexByPathname[pathname as TabKey]
  // NOTE: chakra 在上面屏蔽了 tab 键导航（变成了箭头键导航），还不如完成重写不使用它
  const nav = (
    <ui.TabList flex={1}>
      <Link passHref href="/">
        <ui.Tab as="a">注音</ui.Tab>
      </Link>
      <Link passHref href="/yinjie">
        <ui.Tab as="a">音节表</ui.Tab>
      </Link>
      <Link passHref href="/guanyu">
        <ui.Tab as="a">关于</ui.Tab>
      </Link>
    </ui.TabList>
  )
  const right = (
    <ui.HStack spacing="4">
      <ui.Box>
        <ZhuyinMenu />
      </ui.Box>
      <ui.Link
        isExternal
        href="https://github.com/ambar/xiangyin"
        aria-label="GitHub 源码与反馈"
        display="block"
        transition="color .15s"
        sx={{color: 'gray', transition: 'color .15s ease-in-out'}}
        _hover={{color: 'inherit'}}
      >
        <bsi.BsGithub size={20} />
      </ui.Link>
    </ui.HStack>
  )
  const head = (
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
  )
  const body = (
    <ui.Box pt="4">
      <ui.Tabs
        // NOTE: tab 文字与后续主体内容对齐，但移动端可能顶边，需要更好的设计
        pl={['4', 0]}
        pr="4"
        variant="soft-rounded"
        index={tabIndex}
        // 转化为 controlled tabs，由 Next.js 处理
        onChange={() => {}}
      >
        <ui.HStack>
          {nav}
          {right}
        </ui.HStack>
      </ui.Tabs>
      <ui.Box p="4">{children}</ui.Box>
    </ui.Box>
  )

  return (
    <ui.Container maxW="6xl" px="0">
      {head}
      <ZhuyinSettingsProvider>{body}</ZhuyinSettingsProvider>
    </ui.Container>
  )
}

export default BasePage
