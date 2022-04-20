import * as xy from '../长沙话音档'
import {query} from '../长沙话音档'

test('query', () => {
  expect(query('中')).toMatchSnapshot()
  expect(query('椅')).toMatchSnapshot()
  expect(query('顏', 'ToneValue')).toEqual([])
})

test('Initial/Finals', () => {
  const matched = xy.items.every(
    (x) => x.声母 in xy.Initials && x.韵母 in xy.Finals
  )
  expect(matched).toBe(true)
})
