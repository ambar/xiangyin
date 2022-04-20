import {
  CSOctetToneNo,
  csOctetToneNo2toneName,
  csOctetToneNo2toneValue,
  getToneLetter,
  octetToneNo2csToneNo,
  ToneType,
} from './tones'
import {NormResult} from './types'
import {FinalsConfig, InitialConfig} from './湘拼'
import json from './湘音检字.json'
import {Final, Finals, Initial, Initials} from './湘音检字.meta'
export * from './湘音检字.meta'

const head = ['湘拼', '音標', '調號', '字甲', '字乙', '釋義'] as const

type DataItem = Record<typeof head[number], string> & {
  声: string
  韵: string
}

// 异体、多音字分组 16519 -> 13543
const charGroup = new Map<string, DataItem[]>()

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

const xpByInitial = Object.fromEntries(
  InitialConfig.map(([x, , , v]) => [x, v]).filter((x) => x[0] !== null)
) as Record<Initial, string>
const xpByFinal = Object.fromEntries(
  FinalsConfig.map(([x, , , v]) => [x, v]).filter((x) => x[0] !== null)
) as Record<Final, string>

/** 原文 IPA 转湘拼 */
export const ipa2xpa = (i: string, f: string) => {
  // NOTE：可能对应单独 ɿ 音（对应 r 日）
  if (i === '' && f === Finals.ɿ) {
    return 'r'
  }
  const xpi = xpByInitial[i as Initial]
  const xpf = xpByFinal[f as Final]
  return xpi + xpf
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
  toneType: ToneType = 'CSToneNo'
): NormResult[] => {
  const items = charGroup.get(char) || []
  return items.map((item) => {
    let octet = item.調號 as unknown as CSOctetToneNo
    let tone: string | number = octet
    if (toneType === 'CSToneNo') {
      tone = octetToneNo2csToneNo[octet]
    } else if (toneType === 'ToneLetter') {
      tone = getToneLetter(csOctetToneNo2toneValue[octet])
    } else if (toneType === 'ToneValue') {
      tone = csOctetToneNo2toneValue[octet]
    } else if (toneType === 'OctetToneNo') {
      tone = octet
    } else if (toneType === 'ToneName') {
      tone = csOctetToneNo2toneName[octet]
    } else {
      tone = octetToneNo2csToneNo[octet]
    }
    return {音: item.音標, 声: item.声, 韵: item.韵, 调: tone, 释: item.釋義}
  })
}
