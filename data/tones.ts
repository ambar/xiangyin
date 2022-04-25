/**
 * 声调格式转换
 *
 * @see https://zh.wikipedia.org/wiki/四聲
 */

export const ToneTypes = [
  'ToneName',
  'CSToneNo',
  'OctetToneNo',
  'ToneValue',
  'ToneLetter',
] as const
export type ToneType = typeof ToneTypes[number]

export type ToneCode = keyof typeof toneCode2toneName
export const toneCode2toneName = {
  T0: '轻声',
  T1: '平声',
  T1a: '阴平',
  T1b: '阳平',
  T2: '上声',
  T2a: '阴上',
  T2b: '阳上',
  T3: '去声',
  T3a: '阴去',
  T3b: '阳去',
  T4: '入声',
  T4a: '阴入',
  T4b: '阳入',
}

export type ToneName = keyof typeof toneName2ToneCode
export const toneName2ToneCode = transpose(toneCode2toneName)

/** 长沙话序号声调 */
export const toneCode2csToneNo: Partial<Record<ToneCode, CSToneNo | ''>> = {
  T0: '',
  T1a: 1,
  T1b: 2,
  T2: 3,
  T3a: 4,
  T3b: 5,
  T4: 6,
  T4a: 6,
}

/** 八位数字声调 */
export type OctetToneNo = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type ToneLetterValue = 1 | 2 | 3 | 4 | 5
const toneLetters: Record<ToneLetterValue, string> = {
  1: '˩',
  2: '˨',
  3: '˧',
  4: '˦',
  5: '˥',
}

export function getToneLetter(number: number) {
  return [...String(number)]
    .map((x) => toneLetters[x as unknown as ToneLetterValue])
    .join('')
}

export const csConfig = [
  // 仅汉语方音字汇中有个别轻声
  ['轻声', 0, 0, 0, ''],
  ['阴平', 1, 1, 33, getToneLetter(33)],
  ['阳平', 2, 2, 13, getToneLetter(13)],
  ['上声', 3, 3, 41, getToneLetter(41)],
  ['阴去', 5, 4, 55, getToneLetter(55)],
  ['阳去', 6, 5, 11, getToneLetter(11)],
  ['入声', 7, 6, 24, getToneLetter(24)],
] as const

/** 长沙话调名  */
export type CSToneName = typeof csConfig[number][0]
/** 长沙话在用的八位数字声调  */
export type CSOctetToneNo = typeof csConfig[number][1]
/** 长沙话调序 */
export type CSToneNo = typeof csConfig[number][2]

const cellIndexByToneType: Record<ToneType, number> = {
  ToneName: 0,
  OctetToneNo: 1,
  CSToneNo: 2,
  ToneValue: 3,
  ToneLetter: 4,
}

// TODO: 结果加类型
export const changeTone = (
  input: string | number,
  inputType: ToneType,
  outputType: ToneType
) => {
  const row = csConfig.find(
    (row) => row[cellIndexByToneType[inputType]] === input
  )
  if (!row) {
    throw new Error(`Invalid input: ${input}`)
  }
  return row[cellIndexByToneType[outputType]]
}

/** 转置 kv 对象 */
function transpose<K extends keyof any, V extends keyof any>(
  obj: Record<K, V>,
  numberify = false
): Record<V, K> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [v, numberify ? Number(k) : k])
  )
}
