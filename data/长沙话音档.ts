import json from './raw/长沙话音档.修正.json'
import {changeTone} from './tones'
import {NormResult, QueryOptions, SchemaEntries} from './types'
import {AnyFinal, AnyInitial, toSianpinA} from './湘拼'
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

export const charGroup = new Map<string, DataItem[]>()

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

export const items = json.map((x) => {
  const item = Object.fromEntries(
    schema.map(([key, val], i) => [key, val(x[i])])
  ) as DataItem
  item.声母 = normSyllable(item.声母)
  item.韵母 = normSyllable(item.韵母)
  // 自定义增补
  item.长沙调序 = changeTone(item.调值, 'ToneValue', 'CSToneNo') as number
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
      let tone = changeTone(x.长沙调序, 'CSToneNo', toneType)
      let {声母: 声, 韵母: 韵} = x
      let 音
      if (pinyinType === 'XPA') {
        ;[音, 声, 韵] = toSianpinA(声 as AnyInitial, 韵 as AnyFinal)
      } else {
        音 = x.声母 + x.韵母
      }
      return {音, 声, 韵, 调: tone, 释: ''}
    })
  }
  return []
}
