import * as ui from '@chakra-ui/react'
import {useBoolean} from '@chakra-ui/react'
import {createContext, useContext, useEffect, useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {
  queryPinyin,
  queryPinyinAll,
  QueryResult,
  Source,
  sourceOptions,
} from './pinyin'

const reHan = /\p{Script=Han}/u
const example = `
鹊桥仙
溪邊白鷺，來吾告汝：溪裡魚兒堪數。主人憐汝汝憐魚，要物我欣然一處。
白沙遠浦，青泥別渚，剩有蝦跳鰍舞。任君飛去飽時來，看頭上風吹一縷。

鹊桥仙
纤云弄巧，飞星传恨，银汉迢迢暗度。金风玉露一相逢，便胜却人间无数。
柔情似水，佳期如梦，忍顾鹊桥归路。两情若是久长时，又岂在朝朝暮暮。

鵲橋仙 秦觀
纖雲弄巧，飛星傳恨，銀漢迢迢暗度。金風玉露一相逢，便勝卻人間無數。
柔情似水，佳期如夢，忍顧鵲橋歸路。兩情若是久長時，又豈在朝朝暮暮。

吉日兮辰良，穆將愉兮上皇。
撫長劍兮玉珥，璆鏘鳴兮琳琅。
`.trim()

const StyledPopover: React.FC<{
  trigger: React.ReactNode
  header: React.ReactNode
  children: React.ReactNode
}> = ({trigger, header, children, ...props}) => {
  return (
    <ui.Popover isLazy trigger="hover" placement="left" {...props}>
      {trigger && <ui.PopoverTrigger>{trigger}</ui.PopoverTrigger>}
      <ui.Portal>
        <ui.PopoverContent>
          {header && (
            <ui.PopoverHeader fontWeight="semibold">{header}</ui.PopoverHeader>
          )}
          <ui.PopoverArrow />
          <ui.PopoverCloseButton />
          <ui.PopoverBody>{children}</ui.PopoverBody>
        </ui.PopoverContent>
      </ui.Portal>
    </ui.Popover>
  )
}

const MultipleSearchResult: React.FC<{char: string}> = ({char}) => {
  const shouldQueryVariants = useContext(ShouldQueryVariantsContext)
  const [results, setResults] = useState<ReturnType<typeof queryPinyinAll>>([])

  useEffect(() => {
    setResults(queryPinyinAll(char, shouldQueryVariants))
  }, [char, shouldQueryVariants])

  const hasResult = results.some((x) => x[1].length > 0)

  return (
    <ui.TableContainer>
      <ui.Table variant="simple" size="xs">
        {!hasResult && <ui.TableCaption>没有找到结果</ui.TableCaption>}
        <ui.Thead>
          <ui.Tr>
            <ui.Th>源</ui.Th>
            <ui.Th>音</ui.Th>
            <ui.Th>注</ui.Th>
          </ui.Tr>
        </ui.Thead>
        <ui.Tbody>
          {results.map(([source, result]) =>
            result.map((x, i) => (
              <ui.Tr key={i}>
                <ui.Td>《{source}》</ui.Td>
                <ui.Td>{x.音 + x.调}</ui.Td>
                <ui.Td>{x.释}</ui.Td>
              </ui.Tr>
            ))
          )}
        </ui.Tbody>
      </ui.Table>
    </ui.TableContainer>
  )
}

const RubyResult: React.FC<{char: string; result: QueryResult}> = ({
  char,
  result,
}) => {
  let ruby = (
    <ruby onPointerEnter={() => {}}>
      {char}
      {result.length > 0 && (
        <rt>{result.map((x) => x.音 + x.调).join('\n')}</rt>
      )}
    </ruby>
  )
  return (
    <StyledPopover trigger={ruby} header="多重搜索">
      <MultipleSearchResult char={char} />
    </StyledPopover>
  )
}

const ShouldQueryVariantsContext = createContext(true)

function Zhuyin() {
  const [words, setWords] = useState(example)
  const [source, setSource] = useState(Source.湘音检字)
  const [result, setResult] = useState<[string, QueryResult | null][]>([])
  const [shouldQueryVariants, shouldQueryVariantsFlag] = useBoolean(true)

  useEffect(() => {
    setResult(
      Array.from(words).map((c) => {
        // 汉字全部用 ruby 标记，保持变体切换时样式稳定
        let r = reHan.test(c)
          ? queryPinyin(c, shouldQueryVariants, source)
          : null
        return [c, r]
      })
    )
  }, [words, shouldQueryVariants, source])

  let dict = (
    <ui.Box
      css={{
        ruby: {margin: '0 2px'},
        // rt: {font: '.6em/1 Doulos SIL, Arial'},
      }}
    >
      <ui.Textarea
        as={TextareaAutosize}
        size="md"
        placeholder="輸入漢字"
        rows={10}
        maxRows={20}
        value={words}
        onChange={(e) => setWords(e.target.value)}
      />
      <ui.HStack my={4} spacing={5}>
        <ui.Box>
          <ui.Select
            value={source}
            onChange={(e) => setSource(e.target.value as Source)}
          >
            {sourceOptions.map(({label, value}) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </ui.Select>
        </ui.Box>
        <ui.Box>
          <ui.Checkbox
            isChecked={shouldQueryVariants}
            onChange={shouldQueryVariantsFlag.toggle}
          >
            简繁異轉換
          </ui.Checkbox>
        </ui.Box>
      </ui.HStack>
      <ui.Divider my="4" />
      <ui.Text whiteSpace="pre-wrap" fontSize="2xl" lineHeight={1.8}>
        <ShouldQueryVariantsContext.Provider value={shouldQueryVariants}>
          {result.map(([char, result], i) =>
            result ? <RubyResult key={i} char={char} result={result} /> : char
          )}
        </ShouldQueryVariantsContext.Provider>
      </ui.Text>
    </ui.Box>
  )

  return (
    <ui.Container maxW="6xl" px="1">
      <ui.Box pt="4">
        <ui.Tabs isLazy defaultIndex={0} variant="soft-rounded">
          <ui.TabList>
            <ui.Tab>注音</ui.Tab>
            <ui.Tab>音節表</ui.Tab>
          </ui.TabList>
          <ui.TabPanels>
            <ui.TabPanel>{dict}</ui.TabPanel>
            <ui.TabPanel>TODO</ui.TabPanel>
          </ui.TabPanels>
        </ui.Tabs>
      </ui.Box>
    </ui.Container>
  )
}

export default Zhuyin
