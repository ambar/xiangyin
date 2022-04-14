import {query} from '../长沙话音档'

test('query', () => {
  expect(query('中')).toMatchSnapshot()
  expect(query('椅')).toMatchSnapshot()
})
