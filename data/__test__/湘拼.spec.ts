import {AnyFinal, AnyInitial, toSianpinA} from '../湘拼'
import * as xy from '../湘音检字'

const cases: [AnyInitial, AnyFinal][] = [
  [xy.Initials.p, xy.Finals.ã],
  [xy.Initials.k, xy.Finals.ai],
  ['', xy.Finals.ɿ],
  ['', xy.Finals.m̩],
]
test.each(cases)(`ipa2senyn: '%s,%s'`, (a, b) => {
  const xp = expect([a, b, toSianpinA(a, b)]).toMatchSnapshot()
})
