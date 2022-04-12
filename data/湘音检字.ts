import {
  CSOctetToneNo,
  csOctetToneNo2toneName,
  octetToneNo2csToneNo,
  ToneType,
} from './tones'
import {NormResult} from './types'
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

export const query = (
  char: string,
  toneType: ToneType = 'CSToneNo'
): NormResult[] => {
  const items = charGroup.get(char) || []
  return items.map((item) => {
    let octet = item.調號 as unknown as CSOctetToneNo
    let tone: string | number = octet
    if (toneType === 'CSToneNo') {
      tone = octetToneNo2csToneNo[octet]
    } else if (toneType === 'ToneName') {
      tone = csOctetToneNo2toneName[octet]
    }
    return {音: item.音標, 调: tone, 释: item.釋義}
  })
}
