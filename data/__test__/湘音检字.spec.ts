import * as xy from '../湘音检字'
import {query} from '../湘音检字'

test('query', () => {
  expect(query('中')).toMatchSnapshot()
  const zhy = query('鑄')
  expect(query('鋳')).toEqual(zhy)
  expect(query('铸')).toEqual(zhy)
})

test('ipa2if', () => {
  const matched = xy.items.every((x) => xy.ipa2if(x.音標).join('') === x.音標)
  expect(matched).toBe(true)
})

{
  const cases = [
    xy.Initials.p + xy.Finals.ã,
    xy.Initials.k + xy.Finals.ai,
    xy.Finals.ɿ,
    xy.Finals.m̩,
  ]
  test.each(cases)('ipa2if: %s', (x) => {
    const r = xy.ipa2if(x)
    const xp = xy.if2xp(...r)
    expect([r, xp]).toMatchSnapshot()
  })
}
