/**
 * https://zh.wikipedia.org/wiki/四聲
 */

export const toneCodeByName = {
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

export const toneNameByCode = {
  轻声: 'T0',
  平: 'T2',
  平声: 'T2',
  阴平: 'T1a',
  阳平: 'T1b',
  上: 'T2',
  上声: 'T2',
  阴上: 'T2a',
  阳上: 'T2b',
  去: 'T3',
  去声: 'T3',
  阴去: 'T3a',
  阳去: 'T3b',
  入: 'T4',
  入声: 'T4',
  阴入: 'T4a',
  阳入: 'T4b',
}

export const csToneNoByCode = {
  T0: '0',
  T1a: '1',
  T1b: '2',
  T2: '3',
  T3a: '4',
  T3b: '5',
  T4: '6',
}

export const csToneNoByTone = {
  '1': 1,
  '2': 2,
  '3': 3,
  '5': 4,
  '6': 5,
  '7': 6,
}
