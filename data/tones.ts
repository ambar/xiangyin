/**
 * 声调格式转换
 *
 * @see https://zh.wikipedia.org/wiki/四聲
 */

export type ToneType = 'ToneName' | 'CSToneNo' | 'OctetToneNo'

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
export const toneName2ToneCode = {
  轻声: 'T0',
  // 平: 'T2',
  平声: 'T2',
  阴平: 'T1a',
  阳平: 'T1b',
  // 上: 'T2',
  上声: 'T2',
  阴上: 'T2a',
  阳上: 'T2b',
  // 去: 'T3',
  去声: 'T3',
  阴去: 'T3a',
  阳去: 'T3b',
  // 入: 'T4',
  入声: 'T4',
  阴入: 'T4a',
  阳入: 'T4b',
}

/** 长沙话序号声调 */
export type CSToneNo = 1 | 2 | 3 | 4 | 5 | 6

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
/** 长沙话在用的八位数字声调  */
export type CSOctetToneNo = Exclude<OctetToneNo, 4 | 8>

/** 八位数字声调 */
export const octetToneNo2csToneNo: Record<CSOctetToneNo, number> = {
  1: 1,
  2: 2,
  3: 3,
  5: 4,
  6: 5,
  7: 6,
}

export const csOctetToneNo2toneName: Record<CSOctetToneNo, ToneName> = {
  1: '阴平',
  2: '阳平',
  3: '上声',
  5: '阴去',
  6: '阳去',
  7: '入声',
}

/** 四声转长沙话序号 */
export const csToneName2csToneNo: Partial<Record<ToneName, CSToneNo | ''>> = {
  轻声: '',
  阴平: 1,
  阳平: 2,
  上声: 3,
  阴去: 4,
  阳去: 5,
  入声: 6,
}

/** 调值转长沙话序号 */
export const toneValue2csToneNo: Record<number, CSToneNo> = {
  33: 1,
  13: 2,
  41: 3,
  55: 4,
  11: 5,
  24: 6,
}
