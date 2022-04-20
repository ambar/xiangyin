import stringify from 'json-stringify-pretty-compact'
import * as m3 from '../data/汉语方音字汇.meta'
import * as m1 from '../data/湘音检字.meta'
import * as m2 from '../data/长沙话音档.meta'

{
  let iv1 = Object.values(m1.Initials)
  let iv2 = Object.values(m2.Initials)
  let iv3 = Object.values(m3.Initials)
  let set = new Set([...iv1, ...iv2, ...iv3])
  let r = [...set].map((k) => [
    m1.Initials[k as m1.Initial],
    m2.Initials[k as m2.Initial],
    m3.Initials[k as m3.Initial],
  ])
  console.info(set, stringify(r))
}

{
  let fv1 = Object.values(m1.Finals)
  let fv2 = Object.values(m2.Finals)
  let fv3 = Object.values(m3.Finals)
  let set = new Set([...fv1, ...fv2, ...fv3])
  let r = [...set].map((k) => [
    m1.Finals[k as m1.Final],
    m2.Finals[k as m2.Final],
    m3.Finals[k as m3.Final],
  ])
  console.info(set, stringify(r))
}
