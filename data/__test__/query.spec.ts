import {queryPinyin, Source} from '../query'

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
