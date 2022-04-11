/**
 * General Standard Chinese Characters
 * https://zh.wikipedia.org/wiki/通用规范汉字表
 * https://zh.m.wikisource.org/zh-hans/通用规范汉字表
 */

import json from './通用规范汉字表.json'

// NOTE：
// - 繁体字如果包含规范字，表示与规范字相同的传承字
// - 异体字包含规范字，只有一项：珊󠄀
const head = ['字', '音', '繁', '异'] as const

type DataItem = Record<typeof head[number], string>

// 原始数据 8105 项，按繁体、异体展开后 11357 项
const charGroup = new Map<string, DataItem>()

export const items = json.map((x) => {
  const item = Object.fromEntries(x.map((v, i) => [head[i], v])) as DataItem
  const setIfNotSet = (chars: string) => {
    if (chars) {
      Array.from(chars).map((x) => charGroup.set(x, item))
    }
  }
  setIfNotSet(item.字)
  setIfNotSet(item.繁)
  setIfNotSet(item.异)
  return item
})

export const query = (char: string) => {
  return charGroup.get(char)
}

export const queryVariants = (char: string) => {
  const item = charGroup.get(char)
  return item
    ? Array.from((item.字 + item.繁 + item.异).replaceAll(char, ''))
    : []
}
