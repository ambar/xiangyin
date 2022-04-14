import {queryCS} from '../汉语方音字汇'

const csChars = ['蟻', '指', '序', '樹', '核', '強', '會']
test.each(csChars)('queryCS: %s', (char) => {
  expect(queryCS(char)).toMatchSnapshot()
})

test('empty', () => {
  // 仅有灌阳/全州的结果
  expect(queryCS('鷺')).toEqual([])
  expect(queryCS('X')).toEqual([])
})
