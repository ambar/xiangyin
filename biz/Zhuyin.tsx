import * as ui from '@chakra-ui/react'
import {useBoolean} from '@chakra-ui/react'
import {
  createContext,
  useContext,
  // @types/react v18 暂不兼容于 chakra
  // @ts-expect-error Module '"react"' has no exported member 'useDeferredValue'
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {
  queryPinyin,
  queryPinyinAll,
  QueryResult,
  Source,
  sourceOptions,
} from './pinyin'
import {StyledPopover} from './shared'

const reHan = /\p{Script=Han}/u
const example1 = `何解 冇得 颜色 手臂 深圳 谜语 忘记 艺术 意义 铅笔 详细 开福寺 纠缠 巡道街 感觉
吉日兮辰良，穆將愉兮上皇。撫長劍兮玉珥，璆鏘鳴兮琳琅。
`
const example2 = `颜色 手臂 深圳 谜语 忘记 技术 艺术 意义
疑问 铅笔 详细 开福寺 纠缠 巡道街 感觉
帮助 促进 螃蟹 杨志醇 纯洁 选择 仅仅
项目 取消 若即若离 呼吸 狡猾 过滤
律师 必须 需要 习惯 惯性 惯式 贯穿`
const example3 = `
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

const MultipleSearchResult: React.FC<{char: string}> = ({char}) => {
  const shouldQueryVariants = useContext(ShouldQueryVariantsContext)
  const results = useMemo(
    () => queryPinyinAll(char, shouldQueryVariants),
    [char, shouldQueryVariants]
  )
  // 己优化，不需要需要异步处理
  // const [results, setResults] = useState<ReturnType<typeof queryPinyinAll>>([])
  // useEffect(() => {
  //   setResults(queryPinyinAll(char, shouldQueryVariants))
  // }, [char, shouldQueryVariants])

  const hasResult = results.some((x) => x[1].length > 0)

  return (
    <ui.TableContainer>
      <ui.Table variant="simple" size="xs" css={{th: {width: '33%'}}}>
        {!hasResult && <ui.TableCaption>没有找到结果</ui.TableCaption>}
        <ui.Thead>
          <ui.Tr>
            <ui.Th>源</ui.Th>
            <ui.Th>音</ui.Th>
            <ui.Th>释</ui.Th>
          </ui.Tr>
        </ui.Thead>
        <ui.Tbody>
          {results.map(([source, result]) =>
            result.map((x, i) => (
              <ui.Tr key={i}>
                <ui.Td>《{source}》</ui.Td>
                <ui.Td fontFamily="ipa">{x.音 + x.调}</ui.Td>
                {/* 手机不能适应 Grid/TableContainer，除非它用 maxWidth=100vw，但不如折行直观 */}
                <ui.Td whiteSpace="normal">{x.释}</ui.Td>
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
    <StyledPopover triggerContent={ruby} header="多重搜索">
      <MultipleSearchResult char={char} />
    </StyledPopover>
  )
}

const ShouldQueryVariantsContext = createContext(true)
const maxCharsToList = 75

function Zhuyin() {
  const [keyword, setKeyword] = useState(example1)
  const deferredKeyword = useDeferredValue(keyword)
  const [source, setSource] = useState(Source.湘音检字)
  const [result, setResult] = useState<[string, QueryResult | null][]>([])
  const [shouldQueryVariants, shouldQueryVariantsFlag] = useBoolean(true)
  const [charsToList, setCharsToList] = useState<string[]>([])

  useEffect(() => {
    setCharsToList([...deferredKeyword].filter((x) => reHan.test(x)))
  }, [deferredKeyword])

  useEffect(() => {
    setResult(
      Array.from(keyword).map((c) => {
        // 汉字全部用 ruby 标记，保持变体切换时样式稳定
        let r = reHan.test(c)
          ? queryPinyin(c, shouldQueryVariants, source)
          : null
        return [c, r]
      })
    )
  }, [keyword, shouldQueryVariants, source])

  let dict = (
    <ui.Box
      css={{
        ruby: {margin: '0 2px'},
        rt: {fontSize: '.6em', lineHeight: 1},
      }}
    >
      <ui.Textarea
        as={TextareaAutosize}
        size="md"
        placeholder="输入汉字"
        rows={3}
        maxRows={20}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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
            简繁异转换
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

      {charsToList.length > 0 && charsToList.length <= maxCharsToList && (
        <>
          <ui.Divider my="4" />
          <ui.SimpleGrid columns={{sm: 2, md: 3}} spacing="40px">
            {charsToList.map((char, i) => (
              <ui.Box key={i} my="6">
                <ui.Heading as="h3" mb="2" fontSize="2xl">
                  {char}
                </ui.Heading>
                <MultipleSearchResult char={char} />
              </ui.Box>
            ))}
          </ui.SimpleGrid>
        </>
      )}
    </ui.Box>
  )

  return dict
}

export default Zhuyin
