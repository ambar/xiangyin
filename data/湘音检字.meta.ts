type ValueOf<T> = T[keyof T]

export type Initial = ValueOf<typeof Initials>
const Ø = ''

export const Initials = {
  Ø,
  p: 'p',
  pʰ: 'pʰ',
  m: 'm',
  s: 's',
  ts: 'ts',
  tsʰ: 'tsʰ',
  tʃ: 'tʃ',
  tʃʰ: 'tʃʰ',
  ʃ: 'ʃ',
  t: 't',
  tʰ: 'tʰ',
  l̃: 'l̃',
  ȵ: 'ȵ',
  ɕ: 'ɕ',
  ɸ: 'ɸ',
  k: 'k',
  kʰ: 'kʰ',
  tɕ: 'tɕ',
  tɕʰ: 'tɕʰ',
  ɹ: 'ɹ',
  x: 'x',
  ŋ: 'ŋ',
} as const

export const xpByInitial: Record<Initial, string[]> = {
  [Ø]: [Ø],
  p: ['b'],
  pʰ: ['p'],
  m: ['m'],
  s: ['s'],
  ts: ['z'],
  tsʰ: ['c'],
  tʃ: ['zh'],
  tʃʰ: ['ch'],
  ʃ: ['sh'],
  t: ['d'],
  tʰ: ['t'],
  l̃: ['l'],
  ȵ: ['gn'],
  ɕ: ['sh'],
  ɸ: ['f'],
  k: ['g'],
  kʰ: ['k'],
  // 改 j？
  tɕ: ['zh'],
  // 改 q？
  tɕʰ: ['ch'],
  ɹ: ['r'],
  // 改 h？
  x: ['x'],
  ŋ: ['ng'],
}

export type Final = ValueOf<typeof Finals>
export const Finals = {
  ɿ: 'ɿ',
  ɑ: 'ɑ',
  i: 'i',
  u: 'u',
  y: 'y',
  iɑ: 'iɑ',
  yɑ: 'yɑ',
  uɑ: 'uɑ',
  ɘ: 'ɘ',
  ie: 'ie',
  e: 'e',
  o: 'o',
  io: 'io',
  ai: 'ai',
  uai: 'uai',
  yai: 'yai',
  uɘ: 'uɘ',
  ye: 'ye',
  yɘi: 'yɘi',
  uɘi: 'uɘi',
  ɘi: 'ɘi',
  au: 'au',
  x: 'x',
  iau: 'iau',
  əu: 'əu',
  iəu: 'iəu',
  ã: 'ã',
  iã: 'iã',
  uã: 'uã',
  iẽ: 'iẽ',
  ẽ: 'ẽ',
  yã: 'yã',
  yẽ: 'yẽ',
  on: 'on',
  əȵ̍: 'əȵ̍',
  iȵ̍: 'iȵ̍',
  yȵ̍: 'yȵ̍',
  uəȵ̍: 'uəȵ̍',
  ȵ̍: 'ȵ̍',
  aŋ: 'aŋ',
  iaŋ: 'iaŋ',
  uaŋ: 'uaŋ',
  yaŋ: 'yaŋ',
  oŋ: 'oŋ',
  ioŋ: 'ioŋ',
  m̩: 'm̩',
  n̩: 'n̩',
} as const

// Finals
// ; ɿ -> r,  ts -> zhr, tʃʰɿ -> ch, ʃɿ -> sh
export const xpByFinal: Record<Final, string[]> = {
  // NOTE：可能对应单独 ɿ 音（对应 r 日）
  ɿ: [''],
  ɑ: ['a'],
  i: ['i'],
  u: ['u'],
  y: ['y'],
  iɑ: ['ia'],
  yɑ: ['ya'],
  uɑ: ['ua'],
  ɘ: ['e'],
  ie: ['ie'],
  e: ['e'],
  o: ['o'],
  io: ['io'],
  ai: ['ai'],
  uai: ['uai'],
  yai: ['yai'],
  uɘ: ['ue'],
  ye: ['ye'],
  yɘi: ['yei'],
  uɘi: ['uei'],
  ɘi: ['ei'],
  au: ['au'],
  x: ['x'],
  iau: ['iau'],
  əu: ['ou'],
  iəu: ['iou'],
  ã: ['an'],
  iã: ['ian'],
  uã: ['uan'],
  iẽ: ['ienn'],
  ẽ: ['enn'],
  yã: ['yan'],
  yẽ: ['yenn'],
  on: ['on'],
  əȵ̍: ['en'],
  iȵ̍: ['in'],
  yȵ̍: ['yn'],
  uəȵ̍: ['uen'],
  ȵ̍: ['n'],
  aŋ: ['ang'],
  iaŋ: ['iang'],
  uaŋ: ['uang'],
  yaŋ: ['yang'],
  oŋ: ['ong'],
  ioŋ: ['iong'],
  m̩: ['m'],
  n̩: ['n'],
}

// 声母较长的排前面
const sortedInitials = Object.entries(Initials).sort(
  (a, b) => b[1].length - a[1].length
)

/** 分解原文 IPA */
export const ipa2if = (ipa: string): [string, string] => {
  let i = ''
  let f = ''
  // 先从零声母/韵母查起，因为 m̩（韵母）以 m（己有声母）开头
  const matchF = ipa in Finals
  if (matchF) {
    i = ''
    f = ipa
  } else {
    const matchSort = sortedInitials.find((x) => ipa.startsWith(x[1]))
    if (matchSort) {
      i = matchSort[0]
      f = i === Ø ? ipa : ipa.replace(i, '')
    }
  }
  return [i, f]
}

/** 原文 IPA 转湘拼 */
export const if2xp = (i: string, f: string) => {
  // NOTE：可能对应单独 ɿ 音（对应 r 日）
  if (i === Ø && f === Finals.ɿ) {
    return 'r'
  }
  const xpi = xpByInitial[i as Initial]?.[0]
  const xpf = xpByFinal[f as Final]?.[0]
  return xpi + xpf
}
