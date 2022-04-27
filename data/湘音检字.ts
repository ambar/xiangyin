import {createJyinEntry} from './jyin'
import json from './raw/湘音检字.json'
import {changeTone, CSToneNo} from './tones'
import {JyinEntry, SchemaEntries} from './types'
import {addIfNotAdd} from './utils'
import {Final, Finals, Initial, Initials} from './湘音检字.meta'
export * from './湘音检字.meta'

const schema = [
  ['湘拼', String],
  ['音標', String],
  ['調號', Number],
  ['字甲', String],
  ['字乙', String],
  ['釋義', String],
] as const

type DataItem = SchemaEntries<typeof schema> & {
  声: Initial
  韵: Final
  规范: JyinEntry
}

// 异体、多音字分组 16519 -> 13543
export const rawItemsByChar = new Map<string, DataItem[]>()

export const items: JyinEntry[] = []
export const itemsByChar = new Map<string, JyinEntry[]>()

// 声母较长的排前面
const sortedInitials = Object.entries(Initials).sort(
  (a, b) => b[1].length - a[1].length
)

/** 分解原文 IPA */
export const ipa2senyn = (ipa: string) => {
  let i = ''
  let f = ''
  // 先从零声母/韵母查起，因为 m̩（韵母）以 m（己有声母）开头
  const matchF = ipa in Finals
  if (matchF) {
    i = ''
    f = ipa
  } else {
    const matchSort = sortedInitials.find((x) => ipa.startsWith(x[1]))
    if (matchSort) {
      i = matchSort[0]
      f = i === '' ? ipa : ipa.replace(i, '')
    }
  }
  return [i, f] as [Initial, Final]
}

export const rawItems = json.map((x) => {
  const item = Object.fromEntries(
    schema.map(([key, val], i) => [key, val(x[i])])
  ) as unknown as DataItem
  const [声, 韵] = ipa2senyn(item.音標)
  item.声 = 声
  item.韵 = 韵
  addIfNotAdd(rawItemsByChar, item.字甲, item)
  addIfNotAdd(rawItemsByChar, item.字乙, item)
  const normItem = createJyinEntry(
    item.声,
    item.韵,
    changeTone(item.調號, 'OctetToneNo', 'CSToneNo') as CSToneNo,
    item.字甲,
    item.釋義
  )
  item.规范 = normItem
  if (item.字甲) {
    items.push(normItem)
    addIfNotAdd(itemsByChar, item.字甲, normItem)
  }
  if (item.字乙) {
    const theItem = {...normItem, 字: item.字乙}
    items.push(theItem)
    addIfNotAdd(itemsByChar, item.字乙, theItem)
  }
  return item
})

export const query = (char: string): JyinEntry[] => {
  return itemsByChar.get(char) || []
}
