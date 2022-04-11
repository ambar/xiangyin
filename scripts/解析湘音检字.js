const hash = require('stable-hash').default
const fs = require('fs/promises')
const assert = require('assert')
const stringify = require('json-stringify-pretty-compact')

const unwrapQuote = (s) => s.replace(/^"(.*)"$/, '$1')
const csv2json = (values, opts = {}) => {
  const {skip} = {skip: 0, ...opts}
  const [th, ...rows] = values
    .slice(skip)
    .map((x) => x.split('\t').map(unwrapQuote))
  return rows.map((cells) =>
    Object.fromEntries(th.map((k, i) => [k, cells[i]?.trim() ?? '']))
  )
}

const main = async () => {
  // 拼音, 寬式IPA, 調號, 字甲, 字乙, 釋義
  const lines = (await fs.readFile('data/raw/湘音检字.修正.csv'))
    .toString()
    .trim()
    .split('\n')
  const json = csv2json(lines)
  let variantsCount = 0
  let items = []
  for (const [i, v] of json.entries()) {
    let x = {...v}
    if (x.字甲 && x.字甲 === x.字乙) {
      console.warn('甲乙相同', x.字甲, i)
      x.字乙 = ''
    }
    x.調號 = Number(x.調號)
    items.push(x)
    /* 乙列中为同义的简体或异体，可能延续到次行（此行甲列则可能空）
举例：
# 甲乙相同
"chi"	"tɕʰi"	5	"企"	"企"	"舉踵也；～望"
# 次行甲空有乙釋義相同
"zhy"	"tɕy"	5	"鑄"	"鋳"	"～造"
"zhy"	"tɕy"	5		"铸"	"～造"
# 次行甲空有乙釋義不同
"zhi"	"tɕi"	2	"棊"	"棋"	"弈～"
"zhi"	"tɕi"	2		"碁"	"同「棋」"
    */
    if (x.字乙 && x.字乙 !== x.字甲) {
      assert([...x.字乙].length === 1)
      variantsCount += 1
      let prev = json[i - 1]
      if (!x.字甲 && prev.釋義 !== x.釋義) {
        console.warn('同义次行，但釋義不同（可能修正更好）：', [x, prev])
      }
    }
  }

  let hashSet = new Set()
  items.forEach((x) => {
    // assert(x.字甲)
    const hv = hash(x)
    if (hashSet.has(hv)) {
      console.info('重复项', x)
    }
    hashSet.add(hv)
  })

  // items.sort((a, b) => a.字.localeCompare(b.字))
  fs.writeFile(
    'data/湘音检字.json',
    stringify(items.map((x) => Object.values(x)))
  )
  console.info('预览：', items.slice(0, 2))
  console.info(items.length, variantsCount)
}

main()
