const fs = require('fs/promises')
const stringify = require('json-stringify-pretty-compact')
const {csv2json} = require('./utils')

const main = async () => {
  const lines = (await fs.readFile('data/raw/通用规范汉字表.csv'))
    .toString()
    .trim()
    .split('\n')
  const json = csv2json(lines)
  await fs.writeFile(
    'data/通用规范汉字表.json',
    stringify(json.map((x) => Object.values(x)))
  )
}

main()
