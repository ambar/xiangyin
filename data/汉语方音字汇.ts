import {createJyinEntry} from './jyin'
import json from './raw/汉方字.简.修正.json'
import {changeTone, CSToneNo} from './tones'
import {JyinEntry} from './types'
import {addIfNotAdd} from './utils'
import {Final, Initial} from './汉语方音字汇.meta'
export * from './汉语方音字汇.meta'

const schema = [
  ['號', String],
  ['字', String],
  [
    '湘',
    (v: string[][]) =>
      v.map((x) =>
        Object.fromEntries(x.map((x, i) => [subhead[i], x]))
      ) as unknown as RawSubDataItem,
  ],
] as const

const subhead = [
  '片',
  '方言点',
  '声母',
  '韵母',
  '调值',
  '调类',
  '备注',
] as const

type 县市 = '长沙' | '双峰' | '全州(县城)' | '灌阳(文市)'

type RawDataItem = {
  號: string
  字: string
  湘: RawSubDataItem[]
}

type RawSubDataItem = Record<typeof subhead[number], string>

type DataItem = {
  號: string
  字: string
  湘: Record<县市, JyinEntry[]>
}

export const rawItemsByChar = new Map<string, DataItem[]>()

export const normItems: JyinEntry[] = []
export const normItemsByChar = new Map<string, JyinEntry[]>()

const parsePinyin = (v: RawSubDataItem, char: string): JyinEntry[] => {
  // 声/韵/调可能只在任意一个中出现斜线，主要是文白异读
  const i = v.声母.split('/')
  const f = v.韵母.split('/')
  const t = v.调类.split('/')
  const tv = v.调值.split('/')
  const max = Math.max(i.length, f.length, t.length)
  const fill = (list: string[], max: number) => {
    ;[...Array(max).keys()].forEach((_, i) => {
      if (!list[i]) list[i] = list[0]
    })
  }
  ;[i, f, t, tv].forEach((list) => fill(list, max))
  let note = ''
  let notes: string[] | void
  const reTrimPunc = /(^\p{Punctuation}+)|(\p{Punctuation}+$)/gu
  const def =
    max > 1
      ? v.备注
          .replace(
            /^(未注明异读原因)|(^(\p{Script=Han},)+(\p{Script=Han}(\.|$)))/u,
            (x) => {
              note = x.replace(reTrimPunc, '')
              return ''
            }
          )
          .replace(reTrimPunc, '')
      : v.备注
  if (note) {
    notes =
      note === '未注明异读原因' ? Array(5).fill('未注明') : note.split(/,/g)
  }
  return i.map((y, i) => {
    const tn = t[i]
    // 一些项目是单字表示，统一一下（入 -> 入声）
    const toneName = tn.length === 1 ? tn + '声' : tn
    const 声 = y.replace('0', '') as Initial
    const 韵 = f[i] as Final
    const 释 = (notes ? `〔${notes[i]}〕` : '') + def
    return createJyinEntry(
      声,
      韵,
      v.方言点 === '长沙'
        ? (changeTone(toneName, 'ToneName', 'CSToneNo') as CSToneNo)
        : 0,
      char,
      释
    )
  })
}

// TODO: 改成 script 预解析
export const rawItems = json.map((x) => {
  const rawItem = Object.fromEntries(
    // @ts-expect-error
    schema.map(([key, val], i) => [key, val(x[i])])
  ) as unknown as RawDataItem
  const item = {
    號: rawItem.號,
    字: rawItem.字,
    湘: Object.fromEntries(
      rawItem.湘.map((v) => {
        const items = parsePinyin(v, rawItem.字)
        if (v.方言点 === '长沙') {
          items.forEach((x) => {
            normItems.push(x)
            addIfNotAdd(normItemsByChar, x.字, x)
          })
          return [v.方言点, items]
        }
        return [v.方言点, items]
      })
    ),
  } as DataItem
  addIfNotAdd(rawItemsByChar, item.字, item)
  return item
})

// @see 汉语方音字汇.md
const variantMap = [
  ['間', '閒'],
  // TODO: 应当更新 `queryVariants`（包含台湾用字），但要解决不上面的对应问题
  // ['顏', '颜'],
]
variantMap.forEach(([a, b]) => {
  if (!rawItemsByChar.get(a) && rawItemsByChar.has(b)) {
    rawItemsByChar.set(a, rawItemsByChar.get(b)!)
  }
  if (!normItemsByChar.get(a) && normItemsByChar.has(b)) {
    normItemsByChar.set(a, normItemsByChar.get(b)!)
  }
})

export const query = (char: string, cc: 县市) => {
  const items = rawItemsByChar.get(char)
  if (items && cc) {
    return items.map((x) => x.湘[cc] ?? []).flat()
  }
  return []
}

export const queryCS = (char: string) => {
  return normItemsByChar.get(char) || []
}
