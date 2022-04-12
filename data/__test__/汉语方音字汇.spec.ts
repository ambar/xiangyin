import {queryCS} from '../汉语方音字汇'

const csChars = ['蟻', '指', '序', '樹']
test.each(csChars)('queryCS: %s', (char) => {
  expect(queryCS(char)).toMatchSnapshot()
})
