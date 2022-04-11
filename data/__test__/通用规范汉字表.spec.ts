import {query, queryVariants} from '../通用规范汉字表'

test('query', () => {
  const 并 = query('并')
  expect(query('並')).toEqual(并)
  expect(query('併')).toEqual(并)

  const 妆 = query('妆')
  expect(query('妝')).toEqual(妆)
  expect(query('粧')).toEqual(妆)
})

test('queryChars', () => {
  expect(queryVariants('并')).toEqual(['併', '並', '竝'])
  expect(queryVariants('竝')).toEqual(['并', '併', '並'])
  // 字/繁/异
  expect(queryVariants('妆')).toEqual(['妝', '粧'])
  expect(queryVariants('粧')).toEqual(['妆', '妝'])
  expect(queryVariants('妝')).toEqual(['妆', '粧'])
})
