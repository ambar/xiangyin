import * as xy from '../汉语方音字汇'
import {queryCS} from '../汉语方音字汇'

const csChars = ['蟻', '指', '序', '樹', '核', '強', '會', '間']
test.each(csChars)('queryCS: %s', (char) => {
  expect(queryCS(char)).toMatchSnapshot()
})

test('empty', () => {
  // 仅有灌阳/全州的结果
  expect(queryCS('鷺')).toEqual([])
  expect(queryCS('X')).toEqual([])
})

test('if', () => {
  const matched = xy.items
    .map((x) => x.湘.长沙)
    .filter(Boolean)
    .flat()
    .every((x) => x.声 in xy.Initials && x.韵 in xy.Finals)
  expect(matched).toBe(true)
})
