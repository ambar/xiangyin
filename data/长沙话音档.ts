import {createJyinEntry} from './jyin'
import json from './raw/长沙话音档.修正.json'
import {changeTone, CSToneNo} from './tones'
import {JyinEntry, SchemaEntries} from './types'
import {addIfNotAdd} from './utils'
import {Final, Initial} from './长沙话音档.meta'
export * from './长沙话音档.meta'

type metaKey = 'disabled' | 'flawed' | 'comment' | 'corrected'
const schema = [
  ['號', (v: string | null) => v],
  ['声母', (v: string) => v as Initial],
  ['韵母', (v: string) => v as Final],
  ['调类', String],
  ['调值', Number],
  ['例字', (v: string[]) => v],
  ['元', (v: Partial<Record<metaKey, string>>) => v],
] as const

type RawDataItem = SchemaEntries<typeof schema>
export type DataItem = RawDataItem & {
  规范: JyinEntry
}

export const rawItemsByChar = new Map<string, DataItem[]>()

// 其他与字典统一
const normSyllable = (syllable: string) => {
  return syllable
    .replace('ʨ', 'tɕ')
    .replace('ʦ', 'ts')
    .replace('m̍', 'm̩')
    .replace('n̍', 'n̩')
}

export const items: JyinEntry[] = []
export const itemsByChar = new Map<string, JyinEntry[]>()

export const rawItems = json.map((x) => {
  const item = Object.fromEntries(
    schema.map(([key, val], i) => [key, val(x[i])])
  ) as DataItem
  item.声母 = normSyllable(item.声母) as Initial
  item.韵母 = normSyllable(item.韵母) as Final
  item.例字.forEach((c) => {
    addIfNotAdd(rawItemsByChar, c, item)
    const normItem = createJyinEntry(
      item.声母,
      item.韵母,
      changeTone(item.调值, 'ToneValue', 'CSToneNo') as CSToneNo,
      c
    )
    items.push(normItem)
    addIfNotAdd(itemsByChar, c, normItem)
  })
  item.规范 = createJyinEntry(
    item.声母,
    item.韵母,
    changeTone(item.调值, 'ToneValue', 'CSToneNo') as CSToneNo,
    ''
  )
  return item
})

export const query = (char: string): JyinEntry[] => {
  return itemsByChar.get(char) || []
}
