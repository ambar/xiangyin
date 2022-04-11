import {query} from '../湘音检字'

test('query', () => {
  expect(query('中')).toMatchObject([
    {音標: 'tʃoŋ', 調號: 1},
    {音標: 'tʃoŋ', 調號: 5},
  ])
  const zhy = [{音標: 'tɕy', 調號: 5, 釋義: '～造'}]
  expect(query('鑄')).toMatchObject(zhy)
  expect(query('鋳')).toMatchObject(zhy)
  expect(query('铸')).toMatchObject(zhy)
})
