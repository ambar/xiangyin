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

const PinyinTypes = ['IPA', 'XPA', 'XPB'] as const
export type PinyinType = typeof PinyinTypes[number]

export const ZhuyinSettingsContext = createContext<{
  pinyinType: PinyinType
  toneType: ToneType
}>({
  pinyinType: 'IPA',
  toneType: 'CSToneNo',
})

const ZhuyinSettingsSetterContext = createContext<{
  setPinyinType(pinyinType: PinyinType): void
  setToneType(toneType: ToneType): void
}>({
  setPinyinType() {},
  setToneType() {},
})

const getInitialToneType = (): ToneType => {
  if (typeof window !== 'undefined') {
    const initialToneType = localStorage.getItem('app:toneType') as ToneType
    if (initialToneType && ToneTypes.includes(initialToneType)) {
      return initialToneType
    }
  }
  return 'CSToneNo'
}

const getInitialPinyinType = () => {
  if (typeof window !== 'undefined') {
    const initialPinyinType = localStorage.getItem(
      'app:pinyinType'
    ) as PinyinType
    if (initialPinyinType && PinyinTypes.includes(initialPinyinType)) {
      return initialPinyinType
    }
  }
  return 'IPA'
}

export const ZhuyinSettingsProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [toneType, setToneType] = useState<ToneType>(getInitialToneType)
  const [pinyinType, setPinyinType] = useState<PinyinType>(getInitialPinyinType)

  // 暂没有 SSR 需要（如果有，应当存 cookie）
  useEffect(() => {
    localStorage.setItem('app:toneType', toneType)
  }, [toneType])
  useEffect(() => {
    localStorage.setItem('app:pinyinType', pinyinType)
  }, [pinyinType])

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
        // Chakra 在加载页面后就 autofocus 到上面，行为不对
        _focus={{outline: 'none'}}
      >
        <ui.Flex alignItems="center">
          注音方式
          <ui.Icon ml={1} as={bsi.BsCaretDownFill} />
        </ui.Flex>
      </ui.MenuButton>
      <ui.MenuList>
        <ui.MenuOptionGroup
          title="音标"
          type="radio"
          value={pinyinType}
          onChange={(v) => setPinyinType(v as string as PinyinType)}
        >
          <ui.MenuItemOption value="IPA">IPA（原文）</ui.MenuItemOption>
          {/* <ui.MenuItemOption value="XPA">湘拼甲</ui.MenuItemOption>
          <ui.MenuItemOption value="XPB">湘拼乙</ui.MenuItemOption> */}
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
