type AnyFunction<T = any> = (...args: any[]) => T

export const memoize = <T extends AnyFunction<unknown>>(
  fn: T,
  keyFn = (...args: Parameters<T>) => String(args)
) => {
  const cache = new Map<string, unknown>()
  return ((...args: Parameters<T>) => {
    const key = keyFn(...args)
    if (cache.has(key)) {
      return cache.get(key)!
    }
    const value = fn(...args)
    cache.set(key, value)
    return value
  }) as T
}

export const addIfNotAdd = <T>(
  map: Map<string, T[]>,
  char: string,
  item: T
) => {
  if (char) {
    if (map.has(char)) map.get(char)!.push(item)
    else map.set(char, [item])
  }
}
