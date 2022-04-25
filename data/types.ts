import {CSToneNo, OctetToneNo, ToneType} from './tones'
import {AnyFinal, AnyInitial} from './湘拼'

export const PinyinTypes = ['IPA', 'XPA'] as const
export type PinyinType = typeof PinyinTypes[number]

export type QueryOptions = {
  pinyinType?: PinyinType
  toneType?: ToneType
}

export type DiauStyle = {
  /** 即调类，平上去入，分阴阳 */
  调名: string
  /** 八位次序 1~8，在方言内可能缺调，不利于解释 */
  调号: OctetToneNo
  /** 六位次序，1~6，按可用调号依次排列，更实用，方便记忆 */
  调序: CSToneNo
  /** 五度参考音高，对学习者不实用（因人因书因时代表达会略有差异）*/
  调值: number
  /** 调值的符号表示，对学习者不实用 */
  调符: string
}

export type SenynStyle = {
  format(p: PinyinType, t: ToneType): string
  /** 国际音标（原文） */
  IPA: {音: string; 声: AnyInitial; 韵: AnyFinal}
  toIPA(t?: ToneType): string
  /** 「湘拼〇」方案 */
  XPA: {音: string; 声: string; 韵: string}
  toXPA(t?: ToneType): string
}

/**
 * 规范结果
 * - 使每个词典返回一致
 * - 扁平化，允许反查遍历
 */
export type JyinEntry = {
  读: SenynStyle
  调: DiauStyle
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
