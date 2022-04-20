import {queryPinyin, queryPinyinAll, Source} from '../query'
import {ToneType, ToneTypes} from '../tones'

// 閱阅祿禄禿秃續续
test('shouldQueryVariants', () => {
  const groupA = ['閱阅', '祿禄', '禿秃']
  groupA.forEach((chars) => {
    const [a, b] = [...chars]
    expect(queryPinyin(b, false, Source.长沙话音档)).toEqual([])
    expect(queryPinyin(a, true, Source.长沙话音档)).toEqual(
      queryPinyin(b, true, Source.长沙话音档)
    )
  })

  const groupB = ['閱阅', '祿禄', '禿秃', '續续']
  groupB.forEach((chars) => {
    const [a, b] = [...chars]
    expect(queryPinyin(b, false, Source.汉语方音字汇)).toEqual([])
    expect(queryPinyin(a, true, Source.汉语方音字汇)).toEqual(
      queryPinyin(b, true, Source.汉语方音字汇)
    )
  })
})

test.each(ToneTypes.concat('XYZ' as ToneType))(`toneType: %s`, (toneType) => {
  expect(queryPinyinAll('入', false, {toneType})).toMatchSnapshot()
})

test('XPA', () => {
  Array.from('風吉辰人卻').map((c) => {
    expect(
      queryPinyinAll(c, false, {pinyinType: 'XPA'}).map(([s, r]) => [
        s,
        c,
        r.map((x) => x.音),
      ])
    ).toMatchSnapshot()
  })
})
