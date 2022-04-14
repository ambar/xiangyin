/** 使每个词典返回一致的规范结果 */
export type NormResult = {
  音: string
  调: string | number
  释: string
}

type SchemaItem = readonly [string, Function]
type SchemaEntry<T extends SchemaItem> = T extends readonly [infer K, infer V]
  ? Record<K, ReturnType<V>>
  : never
export type SchemaEntries<T extends readonly SchemaItem[]> =
  T extends readonly [infer L, ...infer R]
    ? SchemaEntry<L> & SchemaEntries<R>
    : unknown
