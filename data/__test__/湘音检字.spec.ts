import {ToneType, ToneTypes} from '../tones'
import {query} from '../湘音检字'

test('query', () => {
  expect(query('中')).toMatchSnapshot()
  const zhy = query('鑄')
  expect(query('鋳')).toEqual(zhy)
  expect(query('铸')).toEqual(zhy)
})

test.each(ToneTypes.concat('XYZ' as ToneType))('toneType: %s', (toneType) => {
  expect(query('入', toneType)).toMatchSnapshot()
})
