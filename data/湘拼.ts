import * as m3 from '../data/汉语方音字汇.meta'
import * as m1 from '../data/湘音检字.meta'
import * as m2 from '../data/长沙话音档.meta'

// TODO: 改 union
type XPAInitial = string
type XPAFinal = string
type InitialRow = [
  m1.Initial | null,
  m2.Initial | null,
  m3.Initial | null,
  XPAInitial
]
type FinalRow = [
  m1.Final | null,
  m2.Final | null,
  m3.Final | null,
  //
  XPAFinal
]

export const InitialConfig: InitialRow[] = [
  ['', '', '', ''],
  ['p', 'p', 'p', 'b'],
  ['pʰ', 'pʰ', 'pʰ', 'p'],
  ['m', 'm', 'm', 'm'],
  ['s', 's', 's', 's'],
  ['ts', 'ts', 'ts', 'z'],
  ['tsʰ', 'tsʰ', 'tsʰ', 'c'],
  ['t', 't', 't', 'd'],
  ['tʰ', 'tʰ', 'tʰ', 't'],
  ['ȵ', 'ȵ', 'ȵ', 'gn'],
  // sh -> x
  ['ɕ', 'ɕ', 'ɕ', 'x'],
  ['k', 'k', 'k', 'g'],
  ['kʰ', 'kʰ', 'kʰ', 'k'],
  // zh -> j
  ['tɕ', 'tɕ', 'tɕ', 'j'],
  // ch -> q
  ['tɕʰ', 'tɕʰ', 'tɕʰ', 'q'],
  ['x', 'x', 'x', 'h'],
  ['ŋ', 'ŋ', 'ŋ', 'ng'],
  // 李
  ['l̃', null, null, 'l'],
  [null, 'l', 'l', 'l'],
  // 发
  ['ɸ', null, null, 'f'],
  [null, 'f', 'f', 'f'],
  //  紙長
  ['tʃ', null, null, 'zh'],
  [null, 'tʂ', null, 'zh'],
  // 車尺
  ['tʃʰ', null, null, 'ch'],
  [null, 'tʂʰ', null, 'ch'],
  // 惹
  ['ɹ', null, null, 'r'],
  [null, 'ʐ', null, 'r'],
  [null, null, 'z', 'r'],
  // 诗尸
  ['ʃ', null, null, 'sh'],
  [null, 'ʂ', null, 'sh'],
]

export const FinalsConfig: FinalRow[] = [
  // '' -> i
  ['ɿ', 'ɿ', 'ɿ', 'i'],
  [null, 'ʅ', null, 'i'],

  ['ɑ', null, null, 'a'],
  [null, 'a', 'a', 'a'],

  ['i', 'i', 'i', 'i'],
  ['u', 'u', 'u', 'u'],
  ['y', 'y', 'y', 'y'],

  ['iɑ', null, null, 'ia'],
  [null, 'ia', 'ia', 'ia'],

  ['yɑ', null, null, 'ya'],
  [null, 'ya', 'ya', 'ya'],

  ['uɑ', null, null, 'ua'],
  [null, 'ua', 'ua', 'ua'],

  ['ɘ', null, null, 'e'],
  ['ie', 'ie', 'ie', 'ie'],
  ['e', null, null, 'e'],
  [null, 'ə', null, 'e'],
  [null, null, 'ɤ', 'e'],

  ['o', 'o', 'o', 'o'],
  ['io', 'io', 'io', 'io'],
  ['ai', 'ai', 'ai', 'ai'],
  ['uai', 'uai', 'uai', 'uai'],
  ['yai', 'yai', 'yai', 'yai'],

  ['uɘ', null, null, 'ue'],
  [null, 'uə', null, 'ue'],
  [null, null, 'uɤ', 'ue'],

  ['ye', 'ye', 'ye', 'ye'],
  ['yɘi', null, null, 'yei'],
  [null, 'yei', 'yei', 'yei'],

  ['uɘi', null, null, 'uei'],
  [null, 'uei', 'uei', 'uei'],

  ['ɘi', null, null, 'ei'],
  [null, 'ei', 'ei', 'ei'],

  ['au', 'au', 'au', 'au'],
  // ['x', null, null],
  ['iau', 'iau', 'iau', 'iau'],
  ['əu', 'əu', 'əu', 'ou'],
  ['iəu', 'iəu', 'iəu', 'iou'],
  ['ã', null, null, 'an'],
  [null, 'an', 'an', 'an'],

  ['iã', null, null, 'ian'],
  [null, 'ian', 'ian', 'ian'],

  ['uã', null, null, 'uan'],
  [null, 'uan', 'uan', 'uan'],

  ['iẽ', 'iẽ', 'iẽ', 'ienn'],

  ['ẽ', null, null, 'enn'],
  [null, 'ə̃', null, 'enn'],
  [null, null, 'ɤ̃', 'enn'],

  ['yã', null, null, 'yan'],
  [null, 'yan', 'yan', 'yan'],

  ['yẽ', 'yẽ', 'yẽ', 'yenn'],
  ['on', null, null, 'on'],
  [null, 'õ', 'õ', 'on'],

  ['əȵ̍', null, null, 'en'],
  [null, 'ən', 'ən', 'en'],

  ['iȵ̍', null, null, 'in'],
  [null, 'in', 'in', 'in'],

  ['yȵ̍', null, null, 'yn'],
  [null, 'yn', 'yn', 'yn'],

  ['uəȵ̍', null, null, 'uen'],
  [null, 'uən', 'uən', 'uen'],

  ['ȵ̍', null, null, 'n'],
  ['aŋ', null, null, 'ang'],
  ['iaŋ', null, null, 'iang'],
  ['uaŋ', null, null, 'uang'],
  ['yaŋ', null, null, 'yang'],
  ['oŋ', 'oŋ', null, 'ong'],
  ['ioŋ', 'ioŋ', null, 'iong'],

  ['m̩', 'm̩', 'm̩', 'm'],
  ['n̩', 'n̩', 'n̩', 'n'],
]

export type AnyInitial = m1.Initial | m2.Initial | m3.Initial
export type AnyFinal = m1.Final | m2.Final | m3.Final
const senMap = new Map<AnyInitial, string>()
InitialConfig.forEach(([x, y, z, a]) =>
  [x, y, z].forEach((_) => _ !== null && senMap.set(_, a))
)
const ynMap = new Map<AnyFinal, string>()
FinalsConfig.forEach(([x, y, z, a]) =>
  [x, y, z].forEach((_) => _ !== null && ynMap.set(_, a))
)
export const getXPATuple = (ipaSen: AnyInitial, ipaYn: AnyFinal) => {
  // 只有湘音检字中有这个例外，可能对应单独 ɿ 音（对应 r 日）
  if (ipaSen === '' && ipaYn === m1.Finals.ɿ) {
    return ['ri', 'r', 'i'] as const
  }
  const sen = senMap.get(ipaSen)!
  const yn = ynMap.get(ipaYn)!
  return [sen + yn, sen, yn] as const
}
