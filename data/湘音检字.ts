import json from './湘音检字.json'

const head = ['湘拼', '音標', '調號', '字甲', '字乙', '釋義'] as const

type DataItem = Record<typeof head[number], string>

// 异体、多音字分组 16519 -> 13543
const charGroup = new Map<string, DataItem[]>()

export const items = json.forEach((x) => {
  const item = Object.fromEntries(x.map((v, i) => [head[i], v])) as DataItem
  if (item.字甲) {
    if (charGroup.has(item.字甲)) charGroup.get(item.字甲)!.push(item)
    else charGroup.set(item.字甲, [item])
  }
  if (item.字乙) {
    if (charGroup.has(item.字乙)) charGroup.get(item.字乙)!.push(item)
    else charGroup.set(item.字乙, [item])
  }
})

export const query = (char: string) => {
  return charGroup.get(char)
}
