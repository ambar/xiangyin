const fs = require('fs')
const {execSync} = require('child_process')
const 湘音检字 = require('../data/raw/湘音检字.json')
const 长沙话音档 = require('../data/raw/长沙话音档.修正.json')
const 汉方字 = require('../data/raw/汉方字.简.修正.json')
const {getRange} = require('./cjkrange')

/**
 * 采用 BabelStone Han 显示扩展区汉字
 * NOTE: 支持扩展A区、B区、E区、G区中的部分字符，扩展C区、D区和F区的所有字符
 * 下载：https://www.babelstone.co.uk/Fonts/Download/BabelStoneHan.ttf
 * @see https://www.babelstone.co.uk/Fonts/Han.html#Summary
 * @see https://zh.wikipedia.org/wiki/Wikipedia:Unicode扩展汉字#支援大字集的字型
 */
const exts = [
  // Hana 支持完整的 B~F，所以 G 交给 BabelStone Han（它各区都只支持部分）
  'ExtensionG',
]

const chars = [...湘音检字, ...长沙话音档, ...汉方字]
  .flat(Infinity)
  .filter((x) => x && typeof x === 'string')
  .map((x) => Array.from(x))
  .flat(Infinity)
  .filter((x) => exts.includes(getRange(x)))
  .join('')

console.info(chars, chars.length)

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {font-family: BabelStoneHan;}
    </style>
</head>
<body>${chars}</body>
</html>
`
const toDir = `./styles/fonts/`
fs.writeFileSync('tmp/input.html', html)
execSync(
  'glyphhanger ./tmp/input.html --jsdom --css --formats=woff2 --family=BabelStoneHan --subset=./tmp/BabelStoneHan.ttf',
  {stdio: 'inherit'}
)
execSync(`cp tmp/BabelStoneHan-subset.woff2 ${toDir}`, {stdio: 'inherit'})
execSync(`cp tmp/BabelStoneHan.css ${toDir}`, {stdio: 'inherit'})
const cssFile = `${toDir}BabelStoneHan.css`
fs.writeFileSync(
  cssFile,
  fs
    .readFileSync(cssFile)
    .toString()
    .replace('tmp/', './')
    .replace('BabelStoneHan;', 'BabelStoneHanSubset;')
    .replace(
      'unicode-range',
      'font-display: swap;\n  /* prettier-ignore */\n  unicode-range'
    )
)
