import * as xy from '../汉语方音字汇'
import {queryCS} from '../汉语方音字汇'

const csChars = ['蟻', '指', '序', '樹', '核', '強', '會', '間']
test.each(csChars)('queryCS: %s', (char) => {
  expect(queryCS(char)).toMatchSnapshot()
})

test('api', () => {
  expect(xy.items.length > 0).toBe(true)
  expect(Object.keys(xy.Initials).length > 0).toBe(true)
  expect(Object.keys(xy.Finals).length > 0).toBe(true)
})

test('empty', () => {
  // 仅有灌阳/全州的结果
  expect(queryCS('鷺')).toEqual([])
  expect(queryCS('X')).toEqual([])
})

test('轻声', () => {
  // 个别数量，暂不对格式化特别处理
  expect(queryCS('宜')[0]).toMatchSnapshot()
})

test('senyn', () => {
  const matched = xy.rawItems
    .map((x) => x.湘.长沙)
    .filter(Boolean)
    .flat()
    .every((x) => x.读.IPA.声 in xy.Initials && x.读.IPA.韵 in xy.Finals)
  expect(matched).toBe(true)
})
