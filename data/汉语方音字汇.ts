import json from './raw/汉方字.简.修正.json'

const schema = [
  ['號', String],
  ['字', String],
  [
    '湘',
    (v: string[][]) =>
      v.map((x) =>
        Object.fromEntries(x.map((x, i) => [subhead[i], x]))
      ) as unknown as RawDataSubItem,
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
  湘: RawDataSubItem[]
}

type RawDataSubItem = Record<typeof subhead[number], string>
type DataSubItem = {音: string; 调: string; 释: string}

type DataItem = {
  號: string
  字: string
  湘: Record<县市, DataSubItem[]>
}

const charGroup = new Map<string, DataItem[]>()

const parsePinyin = (v: RawDataSubItem) => {
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
  const def = v.备注
    .replace(/^(未注明异读原因)|(\p{Script=Han},[^.]+)/u, (x) => {
      note = x
      return ''
    })
    .replace(/^\p{Punctuation}/u, '')
  if (note) {
    notes =
      note === '未注明异读原因'
        ? Array(5).fill('未注明异读原因')
        : note.split(/,/g)
  }
  return i.map((_, i) => [
    _,
    f[i],
    t[i],
    (notes ? `〔${notes[i]}〕` : '') + def,
  ])
}

// TODO: 改成 script 预解析
export const items = json.map((x) => {
  const rawItem = Object.fromEntries(
    // @ts-expect-error
    schema.map(([key, val], i) => [key, val(x[i])])
  ) as unknown as RawDataItem
  const item = {
    號: rawItem.號,
    字: rawItem.字,
    湘: Object.fromEntries(
      rawItem.湘.map((v) => [v.方言点, parsePinyin(v)])
    ) as unknown as DataItem['湘'],
  } as DataItem
  const setIfNotSet = (char: string) => {
    if (char) {
      if (charGroup.has(char)) charGroup.get(char)!.push(item)
      else charGroup.set(char, [item])
    }
  }
  setIfNotSet(item.字)
  return item
})

export const query = (char: string, cc: 县市) => {
  const items = charGroup.get(char)
  if (items && cc) {
    return items.map((x) => x.湘[cc]).flat()
  }
}

export const queryCS = (char: string) => {
  return query(char, '长沙')
}
