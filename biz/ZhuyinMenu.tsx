import * as ui from '@chakra-ui/react'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import * as bsi from 'react-icons/bs'
import {ToneType, ToneTypes} from '~/data/tones'
import {PinyinType, PinyinTypes} from '~/data/types'

const defaultPinyinType: PinyinType = 'XPA'
const defaultToneType: ToneType = 'CSToneNo'

export const ZhuyinSettingsContext = createContext<{
  pinyinType: PinyinType
  toneType: ToneType
}>({
  pinyinType: defaultPinyinType,
  toneType: defaultToneType,
})

const ZhuyinSettingsSetterContext = createContext<{
  setPinyinType(pinyinType: PinyinType): void
  setToneType(toneType: ToneType): void
}>({
  setPinyinType() {},
  setToneType() {},
})

type ValueType = [PinyinType | void, ToneType | void]
const parse = (v: string): [PinyinType, ToneType] => {
  let [pinyinType, toneType] = v.split('|') as ValueType
  if (!(toneType && ToneTypes.includes(toneType))) {
    toneType = defaultToneType
  }
  if (!(pinyinType && PinyinTypes.includes(pinyinType))) {
    pinyinType = defaultPinyinType
  }
  return [pinyinType, toneType]
}

const getInitialSettings = (initialJyin?: string): [PinyinType, ToneType] => {
  if (initialJyin) {
    return parse(initialJyin || '')
  } else if (typeof window !== 'undefined') {
    return parse(localStorage.getItem('jyin') || '')
  }
  return [defaultPinyinType, defaultToneType]
}

export const ZhuyinSettingsProvider: React.FC<{
  children: React.ReactNode
  initialJyin?: string
}> = ({children, initialJyin}) => {
  const [[initialPinyinType, initialToneType]] = useState(() =>
    getInitialSettings(initialJyin)
  )
  const [pinyinType, setPinyinType] = useState<PinyinType>(initialPinyinType)
  const [toneType, setToneType] = useState<ToneType>(initialToneType)

  // 暂没有 SSR 需要（如果有，应当存 cookie）
  useEffect(() => {
    localStorage.setItem('jyin', [pinyinType, toneType].join('|'))
  }, [toneType, pinyinType])

  return (
    <ZhuyinSettingsContext.Provider
      value={useMemo(() => ({pinyinType, toneType}), [pinyinType, toneType])}
    >
      <ZhuyinSettingsSetterContext.Provider
        value={useMemo(
          () => ({setToneType, setPinyinType}),
          [setToneType, setPinyinType]
        )}
      >
        {children}
      </ZhuyinSettingsSetterContext.Provider>
    </ZhuyinSettingsContext.Provider>
  )
}

const senynOptions: Record<PinyinType, string> = {
  IPA: 'IPA',
  XPA: '湘拼〇',
}
const senynEntries = Object.entries(senynOptions)

/**
 * 选择注音方式
 */
export default function ZhuyinMenu() {
  const {pinyinType, toneType} = useContext(ZhuyinSettingsContext)
  const {setPinyinType, setToneType} = useContext(ZhuyinSettingsSetterContext)

  return (
    <ui.Menu
      isLazy
      closeOnSelect={false}
      placement="bottom-end"
      autoSelect={false}
    >
      <ui.MenuButton
        as={ui.Button}
        variant="unstyled"
        aria-label="注音方式"
        // Chakra 在加载页面后就 autofocus 到上面，行为不对
        _focus={{outline: 'none'}}
      >
        <ui.Flex
          alignItems="center"
          sx={{
            div: {display: ['none', 'inline']},
          }}
        >
          <ui.Box>注音（</ui.Box>
          {senynOptions[pinyinType]}
          <ui.Box>）</ui.Box>
          <ui.Icon ml={1} as={bsi.BsCaretDownFill} />
        </ui.Flex>
      </ui.MenuButton>
      <ui.MenuList>
        <ui.MenuOptionGroup
          title="声韵"
          type="radio"
          value={pinyinType}
          onChange={(v) => setPinyinType(v as string as PinyinType)}
        >
          {senynEntries.map(([v, k]) => (
            <ui.MenuItemOption key={v} value={v}>
              {k}
            </ui.MenuItemOption>
          ))}
        </ui.MenuOptionGroup>
        <ui.MenuOptionGroup
          title="声调"
          type="radio"
          value={toneType}
          onChange={(v) => setToneType(v as string as ToneType)}
        >
          <ui.MenuItemOption value="CSToneNo">六位次序</ui.MenuItemOption>
          <ui.MenuItemOption value="OctetToneNo">八位次序</ui.MenuItemOption>
          <ui.MenuItemOption value="ToneValue">调值</ui.MenuItemOption>
          <ui.MenuItemOption value="ToneLetter">调符</ui.MenuItemOption>
          {/* <ui.MenuItemOption value="ToneName">调名</ui.MenuItemOption> */}
        </ui.MenuOptionGroup>
      </ui.MenuList>
    </ui.Menu>
  )
}
