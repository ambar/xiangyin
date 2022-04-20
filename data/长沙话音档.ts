import json from './raw/长沙话音档.修正.json'
import {
  CSToneNo,
  csToneNo2octetToneNo,
  csToneNo2toneValue,
  getToneLetter,
  toneValue2csToneNo,
} from './tones'
import {NormResult, QueryOptions, SchemaEntries} from './types'
import {FinalsConfig, InitialConfig} from './湘拼'
import {Final, Initial} from './湘音检字.meta'
export * from './长沙话音档.meta'

type metaKey = 'disabled' | 'flawed' | 'comment' | 'corrected'
const schema = [
  ['號', (v: string | null) => v],
  ['声母', String],
  ['韵母', String],
  ['调类', String],
  ['调值', Number],
  ['例字', (v: string[]) => v],
  ['元', (v: Partial<Record<metaKey, string>>) => v],
] as const

type RawDataItem = SchemaEntries<typeof schema>
export type DataItem = RawDataItem & {
  长沙调序: number
}

const charGroup = new Map<string, DataItem[]>()

const setIfNotSet = (char: string, item: DataItem) => {
  if (char) {
    if (charGroup.has(char)) charGroup.get(char)!.push(item)
    else charGroup.set(char, [item])
  }
}

// 其他与字典统一
const normSyllable = (syllable: string) => {
  return syllable
    .replace('ʨ', 'tɕ')
    .replace('ʦ', 'ts')
    .replace('m̍', 'm̩')
    .replace('n̍', 'n̩')
}

const xpByInitial = Object.fromEntries(
  InitialConfig.map((x) => [x[1], x[3]]).filter((x) => x[0] !== null)
) as Record<Initial, string>
const xpByFinal = Object.fromEntries(
  FinalsConfig.map((x) => [x[1], x[3]]).filter((x) => x[0] !== null)
) as Record<Final, string>

/** IPA 转湘拼 A */
export const ipa2xpa = (i: string, f: string) => {
  const xpi = xpByInitial[i as Initial]
  const xpf = xpByFinal[f as Final]
  return [xpi, xpf]
}

export const items = json.map((x) => {
  const item = Object.fromEntries(
    schema.map(([key, val], i) => [key, val(x[i])])
  ) as DataItem
  item.声母 = normSyllable(item.声母)
  item.韵母 = normSyllable(item.韵母)
  // 自定义增补
  item.长沙调序 = toneValue2csToneNo[item.调值]
  item.例字.forEach((c) => setIfNotSet(c, item))
  return item
})

export const query = (
  char: string,
  {pinyinType = 'IPA', toneType = 'CSToneNo'}: QueryOptions = {}
): NormResult[] => {
  const items = charGroup.get(char)
  if (items) {
    return items.map((x) => {
      let t: string = x.调类
      let tone: string | number = t
      if (toneType === 'CSToneNo') {
        tone = x.长沙调序
      } else if (toneType === 'ToneLetter') {
        tone = getToneLetter(csToneNo2toneValue[x.长沙调序 as CSToneNo])
      } else if (toneType === 'ToneValue') {
        tone = csToneNo2toneValue[x.长沙调序 as CSToneNo]
      } else if (toneType === 'OctetToneNo') {
        tone = csToneNo2octetToneNo[x.长沙调序 as CSToneNo]
      } else if (toneType === 'ToneName') {
        // TODO: 统一简繁
        tone = t
      } else {
        tone = x.长沙调序
      }
      let {声母: 声, 韵母: 韵} = x
      let 音
      if (pinyinType === 'XPA') {
        ;[声, 韵] = ipa2xpa(声, 韵)
        音 = 声 + 韵
      } else {
        音 = x.声母 + x.韵母
      }
      return {音, 声, 韵, 调: tone, 释: ''}
    })
  }
  return []
}
