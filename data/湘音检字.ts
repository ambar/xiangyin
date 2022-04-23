import {changeTone} from './tones'
import {NormResult, QueryOptions} from './types'
import {AnyFinal, AnyInitial, toSianpinA} from './湘拼'
import json from './湘音检字.json'
import {Finals, Initials} from './湘音检字.meta'
export * from './湘音检字.meta'

const head = ['湘拼', '音標', '調號', '字甲', '字乙', '釋義'] as const

type DataItem = Record<typeof head[number], string> & {
  声: string
  韵: string
}

// 异体、多音字分组 16519 -> 13543
export const charGroup = new Map<string, DataItem[]>()

// 声母较长的排前面
const sortedInitials = Object.entries(Initials).sort(
  (a, b) => b[1].length - a[1].length
)

/** 分解原文 IPA */
export const ipa2senyn = (ipa: string): [string, string] => {
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
  return [i, f]
}

export const items = json.map((x) => {
  const item = Object.fromEntries(x.map((v, i) => [head[i], v])) as DataItem
  const setIfNotSet = (char: string) => {
    if (char) {
      if (charGroup.has(char)) charGroup.get(char)!.push(item)
      else charGroup.set(char, [item])
    }
  }
  const [声, 韵] = ipa2senyn(item.音標)
  item.声 = 声
  item.韵 = 韵
  setIfNotSet(item.字甲)
  setIfNotSet(item.字乙)
  return item
})

export const query = (
  char: string,
  {pinyinType = 'IPA', toneType = 'CSToneNo'}: QueryOptions = {}
): NormResult[] => {
  const items = charGroup.get(char) || []
  return items.map((item) => {
    let tone: string | number = changeTone(item.調號, 'OctetToneNo', toneType)
    let {音標: 音, 声, 韵} = item
    if (pinyinType === 'XPA') {
      ;[音, 声, 韵] = toSianpinA(声 as AnyInitial, 韵 as AnyFinal)
    }
    return {音, 声, 韵, 调: tone, 释: item.釋義}
  })
}
