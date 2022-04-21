import * as ui from '@chakra-ui/react'
import {useContext} from 'react'
import * as t from '~/data/tones'
import * as xpConfig from '~/data/湘拼'
import * as xy from '~/data/长沙话音档'
import {playAudio} from './play'
import {VolumeIcon} from './shared'
import {ZhuyinSettingsContext} from './ZhuyinMenu'

const PlayButton = ({syllable}: {syllable: string}) => {
  const handlePlay = () => {
    playAudio(syllable)
  }
  return (
    <ui.Button
      display="inline-flex"
      minWidth="auto"
      height="1.5em"
      p="0"
      aria-label="播放"
      variant="unstyled"
      rightIcon={<VolumeIcon />}
      onPointerEnter={handlePlay}
      onClick={handlePlay}
    />
  )
}

const csTones: t.CSToneNo[] = [1, 2, 3, 4, 5, 6]
const samples = [
  ['例字甲', 'tɕ', 'y', '猪除主句住橘'],
  ['例字乙', 'tɕ', 'i', '机期几记徛极'],
]
// 缺失或不太准
// ['例字丙', 'ʂ', 'ʅ', '詩鰣使式柿濕'],
// ['衣姨以意易一', '都头堵度豆读', '淤魚雨玉芋入']
const SendiauTable = () => {
  const {pinyinType} = useContext(ZhuyinSettingsContext)
  return (
    <ui.Box>
      <ui.Table
        size="xs"
        css={{
          th: {whiteSpace: 'nowrap'},
        }}
      >
        <ui.Tbody>
          <ui.Tr>
            <ui.Th>调名</ui.Th>
            {csTones.map((x) => (
              <ui.Th key={x}>{t.csToneNo2toneName[x]}</ui.Th>
            ))}
          </ui.Tr>
          <ui.Tr>
            <ui.Th>六位次序</ui.Th>
            {csTones.map((x) => (
              <ui.Td key={x}>{x}</ui.Td>
            ))}
          </ui.Tr>
          <ui.Tr>
            <ui.Th>八位次序</ui.Th>
            {csTones.map((x) => (
              <ui.Td key={x}>{t.csToneNo2octetToneNo[x]}</ui.Td>
            ))}
          </ui.Tr>
          <ui.Tr>
            <ui.Th>调值</ui.Th>
            {csTones.map((x) => (
              <ui.Td key={x}>{t.csToneNo2toneValue[x]}</ui.Td>
            ))}
          </ui.Tr>
          <ui.Tr>
            <ui.Th>调符</ui.Th>
            {csTones.map((x) => (
              <ui.Td key={x} fontFamily="ipa" fontSize="xl">
                {t.getToneLetter(t.csToneNo2toneValue[x])}
              </ui.Td>
            ))}
          </ui.Tr>
          {samples.map(([head, sen, yn, texts]) => (
            <ui.Tr key={head}>
              <ui.Th>{head}</ui.Th>
              {Array.from(texts).map((x, i) => (
                <ui.Td key={x}>
                  <ui.Flex alignItems="center">
                    <ruby>
                      {x}
                      <rt>
                        {pinyinType === 'XPA'
                          ? xy.ipa2xpa(sen, yn).join('')
                          : sen + yn}
                        {i + 1}
                      </rt>
                    </ruby>
                    <PlayButton syllable={sen + yn + (i + 1)} />
                  </ui.Flex>
                </ui.Td>
              ))}
            </ui.Tr>
          ))}
        </ui.Tbody>
      </ui.Table>
    </ui.Box>
  )
}

const E = '∅'
const getI = (i: string | null) => (i === '' ? E : i)
const cells = [
  '《湘音检字》',
  '《长沙话音档》',
  '《汉语方音字汇》',
  '「湘拼〇」',
]
const countInitials = xpConfig.InitialConfig[0].map(
  (_, i) =>
    new Set(xpConfig.InitialConfig.map((x) => x[i]).filter((x) => x !== null))
      .size
)
const countFinals = xpConfig.FinalsConfig[0].map(
  (_, i) =>
    new Set(xpConfig.FinalsConfig.map((x) => x[i]).filter((x) => x !== null))
      .size
)
const SenynTable = () => {
  const {colorMode} = ui.useColorMode()
  const thBg = colorMode === 'dark' ? 'gray.800' : 'white'

  return (
    <ui.SimpleGrid
      width="100%"
      columns={2}
      spacing={12}
      sx={{
        th: {
          position: 'sticky',
          top: 0,
          bg: thBg,
          // writingMode: ['vertical-rl', 'vertical-rl', 'vertical-rl', 'unset'],
          fontSize: 'md',
          verticalAlign: 'bottom',
        },
        'th div': {
          display: 'inline',
        },
        // 模拟竖排 writingMode: vertical-rl，因为 Safari 支持不太行
        '@media(max-width: 1000px)': {
          'th div': {
            display: 'block',
          },
          // 首位标点模拟竖排
          'th div:first-of-type, th div:last-of-type': {
            marginLeft: '.3em',
            width: '1em',
            height: '1em',
            transform: 'rotate(90deg)',
          },
        },
      }}
    >
      <ui.Box>
        <ui.Table variant="simple" size="xs" fontSize="large">
          <ui.TableCaption fontSize="large" placement="top">
            声母
          </ui.TableCaption>
          <ui.Thead>
            <ui.Tr>
              {cells.map((x, i) => (
                <ui.Th key={i}>
                  {Array.from(x).map((c) => (
                    <ui.Box key={c}>{c}</ui.Box>
                  ))}
                </ui.Th>
              ))}
            </ui.Tr>
          </ui.Thead>
          <ui.Tbody fontFamily="ipa">
            <ui.Tr>
              {cells.map((x, i) => (
                <ui.Td key={i}>{countInitials[i]}</ui.Td>
              ))}
            </ui.Tr>
            {xpConfig.InitialConfig.map(([a, b, c, y], i) => (
              <ui.Tr key={i}>
                <ui.Td>{getI(a)}</ui.Td>
                <ui.Td>{getI(b)}</ui.Td>
                <ui.Td>{getI(c)}</ui.Td>
                <ui.Td>{getI(y)}</ui.Td>
              </ui.Tr>
            ))}
          </ui.Tbody>
        </ui.Table>
      </ui.Box>
      <ui.Box>
        <ui.Table variant="simple" size="xs" fontSize="large">
          <ui.TableCaption fontSize="large" placement="top">
            韵母
          </ui.TableCaption>
          <ui.Thead>
            <ui.Tr>
              {cells.map((x, i) => (
                <ui.Th key={i}>
                  {Array.from(x).map((c) => (
                    <ui.Box key={c}>{c}</ui.Box>
                  ))}
                </ui.Th>
              ))}
            </ui.Tr>
          </ui.Thead>
          <ui.Tbody fontFamily="ipa">
            <ui.Tr>
              {cells.map((x, i) => (
                <ui.Td key={i}>{countFinals[i]}</ui.Td>
              ))}
            </ui.Tr>
            {xpConfig.FinalsConfig.map(([a, b, c, y], i) => (
              <ui.Tr key={i}>
                <ui.Td>{a}</ui.Td>
                <ui.Td>{b}</ui.Td>
                <ui.Td>{c}</ui.Td>
                <ui.Td>{y}</ui.Td>
              </ui.Tr>
            ))}
          </ui.Tbody>
        </ui.Table>
      </ui.Box>
    </ui.SimpleGrid>
  )
}

const Guanyu = () => {
  return (
    <ui.Box>
      <ui.Heading fontSize="xl">收字情况</ui.Heading>
      <ui.UnorderedList mt={4}>
        <ui.ListItem>《湘音检字》1937 收字约 13543</ui.ListItem>
        <ui.ListItem>《长沙话音档》1997 收字约 3696</ui.ListItem>
        <ui.ListItem>《汉语方音字汇》2003 收字约 3340</ui.ListItem>
      </ui.UnorderedList>

      <ui.Heading my={8} fontSize="xl">
        声调表
      </ui.Heading>
      <SendiauTable />

      <ui.Heading mt={8} fontSize="xl">
        声韵表
      </ui.Heading>
      <SenynTable />
    </ui.Box>
  )
}

export default Guanyu
