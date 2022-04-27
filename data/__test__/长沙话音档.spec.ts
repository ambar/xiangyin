import * as xy from '../长沙话音档'
import {query} from '../长沙话音档'

test('api', () => {
  expect(xy.items.length > 0).toBe(true)
  expect(Object.keys(xy.Initials).length > 0).toBe(true)
  expect(Object.keys(xy.Finals).length > 0).toBe(true)
})

test('query', () => {
  expect(query('中')).toMatchSnapshot()
  expect(query('椅')).toMatchSnapshot()
  expect(query('顏')).toEqual([])
})

test('senyn', () => {
  const matched = xy.rawItems.every(
    (x) => x.声母 in xy.Initials && x.韵母 in xy.Finals
  )
  expect(matched).toBe(true)
})
