import {ToneType, ToneTypes} from '../tones'
import {query} from '../长沙话音档'

test('query', () => {
  expect(query('中')).toMatchSnapshot()
  expect(query('椅')).toMatchSnapshot()
  expect(query('顏', 'ToneValue')).toEqual([])
})

test.each(ToneTypes.concat('XYZ' as ToneType))('toneType: %s', (toneType) => {
  expect(query('入', toneType)).toMatchSnapshot()
})
