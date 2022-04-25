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
