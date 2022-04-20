export type Initial = keyof typeof Initials
export type Final = keyof typeof Finals

/** 《汉语方音字汇》长沙方言声母，共 20 个 */
export const Initials = {
  '': '', // 儿以问软
  p: 'p', // 玻比平
  pʰ: 'pʰ', // 派判泼
  m: 'm', // 米满蚊
  f: 'f', // 夫肥荒
  t: 't', // 多团读
  tʰ: 'tʰ', // 妥体突
  l: 'l', // 怒来林
  ts: 'ts', // 左知存
  tsʰ: 'tsʰ', // 错痴寸
  s: 's', // 所少舌
  z: 'z', // 日惹人
  tɕ: 'tɕ', // 家疾砖
  tɕʰ: 'tɕʰ', // 缺切窗
  ȵ: 'ȵ', // 女牛惹
  ɕ: 'ɕ', // 戏小爽
  k: 'k', // 哥家共
  kʰ: 'kʰ', // 苦叩空
  ŋ: 'ŋ', // 牙偶思
  x: 'x', // 欢孩风
} as const

/** 《汉语方音字汇》长沙方言韵母，共 38 个 */
export const Finals = {
  ɿ: 'ɿ', // 子私支日
  i: 'i', // 齐比积七
  u: 'u', // 布服骨酷
  y: 'y', // 朱去术入
  a: 'a', // 爬化八瞎
  ia: 'ia', // 家斜恰瞎
  ua: 'ua', // 瓜袜
  ya: 'ya', // 抓刷
  ie: 'ie', // 借节穴
  ye: 'ye', // 说掘月
  ɤ: 'ɤ', // 车儿北得
  uɤ: 'uɤ', // 国
  o: 'o', // 搓合剥
  io: 'io', // 脚略岳
  ai: 'ai', // 海派赛
  uai: 'uai', // 怪快外
  yai: 'yai', // 揣帅
  ei: 'ei', // 卑对最灰
  uei: 'uei', // 龟亏威
  yei: 'yei', // 追吹水锐
  au: 'au', // 靠卯招少
  iau: 'iau', // 标条交小
  əu: 'əu', // 偷浮都欲
  iəu: 'iəu', // 丢秋曲
  iẽ: 'iẽ', // 边店尖烟
  yẽ: 'yẽ', // 捐串悬
  ɤ̃: 'ɤ̃', // 占扇
  õ: 'õ', // 半短款碗
  an: 'an', // 板三张伤
  ian: 'ian', // 娘江羊
  uan: 'uan', // 关旷枉
  yan: 'yan', // 装窗删
  ən: 'ən', // 根猛中深
  in: 'in', // 冰敏今兄
  uən: 'uən', // 滚困文
  yn: 'yn', // 君春水
  m̩: 'm̩', // 姆
  n̩: 'n̩', // 你
} as const
