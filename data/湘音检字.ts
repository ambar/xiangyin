import json from './湘音检字.json'

const head = ['湘拼', '音標', '調號', '字甲', '字乙', '釋義'] as const

type DataItem = Record<typeof head[number], string>

// 异体、多音字分组 16519 -> 13543
const charGroup = new Map<string, DataItem[]>()

export const items = json.map((x) => {
  const item = Object.fromEntries(x.map((v, i) => [head[i], v])) as DataItem
  const setIfNotSet = (char: string) => {
    if (char) {
      if (charGroup.has(char)) charGroup.get(char)!.push(item)
      else charGroup.set(char, [item])
    }
  }
  setIfNotSet(item.字甲)
  setIfNotSet(item.字乙)
  return item
})

export const query = (char: string) => {
  return charGroup.get(char)
}
