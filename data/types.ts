import {ToneType} from './tones'

export const PinyinTypes = ['IPA', 'XPA'] as const
export type PinyinType = typeof PinyinTypes[number]

export type QueryOptions = {
  pinyinType?: PinyinType
  toneType?: ToneType
}

/** 使每个词典返回一致的规范结果 */
export type NormResult = {
  音: string
  声: string
  韵: string
  调: string | number
  释: string
}

type AnyFunction = (...args: any) => any
type SchemaItem = readonly [string, AnyFunction]
type SchemaEntry<T extends SchemaItem> = T extends readonly [infer K, infer V]
  ? K extends string
    ? V extends AnyFunction
      ? Record<K, ReturnType<V>>
      : never
    : never
  : never
export type SchemaEntries<T extends readonly any[]> = T extends readonly [
  infer L,
  ...infer R
]
  ? L extends SchemaItem
    ? SchemaEntry<L> & SchemaEntries<R>
    : unknown
  : unknown
