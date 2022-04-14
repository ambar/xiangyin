import json from './raw/长沙话音档.修正.json'
import {toneValue2csToneNo, ToneType} from './tones'
import {NormResult, SchemaEntries} from './types'

const schema = [
  ['號', (v: string | null) => v],
  ['声母', String],
  ['韵母', String],
  ['调类', String],
  ['调值', Number],
  ['例字', (v: string[]) => v],
  ['元', (v: Partial<Record<'disabled' | 'flawed', string>>) => v],
] as const

type RawDataItem = SchemaEntries<typeof schema>

const charGroup = new Map<string, RawDataItem[]>()

const setIfNotSet = (char: string, item: RawDataItem) => {
  if (char) {
    if (charGroup.has(char)) charGroup.get(char)!.push(item)
    else charGroup.set(char, [item])
  }
}

export const items = json.map((x) => {
  const item = Object.fromEntries(
    schema.map(([key, val], i) => [key, val(x[i])])
  ) as RawDataItem
  item.例字.forEach((c) => setIfNotSet(c, item))
  return item
})

export const query = (
  char: string,
  toneType: ToneType = 'CSToneNo'
): NormResult[] => {
  const items = charGroup.get(char)
  if (items) {
    return items.map((x) => {
      let t: string | number = x.调类
      if (toneType === 'CSToneNo') {
        t = toneValue2csToneNo[x.调值]
      }
      return {音: x.声母 + x.韵母, 调: t, 释: ''}
    })
  }
  return []
}
