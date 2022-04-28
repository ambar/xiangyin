const fs = require('fs')
const {execSync} = require('child_process')
const 湘音检字 = require('../data/raw/湘音检字.json')
const 长沙话音档 = require('../data/raw/长沙话音档.修正.json')
const 汉方字 = require('../data/raw/汉方字.简.修正.json')
const {getRange} = require('./cjkrange')

/**
 * 采用开源的花园明朝显示扩展区汉字
 * 该字体分成 HanaMinA（花園明朝A）、HanaMinB（花園明朝B）两部分：
 * - HanaMinA仅对中日韩统一表意文字区及其扩展A区提供全面支持
 * - HanaMinB提供了对B区、C区、D区、E区、F区的完整支持。
 * 下载：https://osdn.net/projects/hanazono-font/releases/68253
 * @see https://zh.wikipedia.org/wiki/Wikipedia:Unicode扩展汉字#支援大字集的字型
 */
const exts = [
  'ExtensionB',
  'ExtensionC',
  'ExtensionD',
  'ExtensionE',
  'ExtensionF',
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
        body {font-family: Hana;}
    </style>
</head>
<body>${chars}</body>
</html>
`
const toDir = `./styles/fonts/`
fs.writeFileSync('tmp/input.html', html)
execSync(
  'glyphhanger ./tmp/input.html --jsdom --css --formats=woff2 --family=Hana --subset=./tmp/HanaMinB.ttf',
  {stdio: 'inherit'}
)
execSync(`cp tmp/HanaMinB-subset.woff2 ${toDir}`, {stdio: 'inherit'})
execSync(`cp tmp/HanaMinB.css ${toDir}`, {stdio: 'inherit'})
const cssFile = `${toDir}HanaMinB.css`
fs.writeFileSync(
  cssFile,
  fs
    .readFileSync(cssFile)
    .toString()
    .replace('tmp/', './')
    .replace('Hana;', 'HanaSubset;')
    .replace(
      'unicode-range',
      'font-display: swap;\n  /* prettier-ignore */\n  unicode-range'
    )
)
