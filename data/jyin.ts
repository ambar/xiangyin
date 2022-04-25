import {changeTone, CSToneNo, OctetToneNo, ToneType} from './tones'
import {DiauStyle, JyinEntry, PinyinType} from './types'
import {memoize} from './utils'
import {AnyFinal, AnyInitial, getXPATuple} from './湘拼'

export const createToneStyle = memoize((t: CSToneNo): DiauStyle => {
  return Object.freeze({
    /* 即调类，平上去入，分阴阳 */
    调名: changeTone(t, 'CSToneNo', 'ToneName') as string,
    /* 八位次序 1~8，在方言内可能缺调，不利解释 */
    调号: changeTone(t, 'CSToneNo', 'OctetToneNo') as OctetToneNo,
    /* 六位次序，1~6，按可用调号依次排列，更实用，方便记忆 */
    调序: t,
    /** 五度参考音高，对学习者不实用（因人因书因时代表达会略有差异）*/
    调值: changeTone(t, 'CSToneNo', 'ToneValue') as number,
    /** 调值的符号表示，对学习者不实用 */
    调符: changeTone(t, 'CSToneNo', 'ToneLetter') as string,
  })
})

const tMap: Record<ToneType, keyof DiauStyle> = {
  CSToneNo: '调序',
  OctetToneNo: '调号',
  ToneName: '调名',
  ToneValue: '调值',
  ToneLetter: '调符',
}

// 节省计算与内存，同时又避免使用原型（不利测试）
const createSenyndiau = memoize(
  (sen: AnyInitial, yn: AnyFinal, tone: CSToneNo) => {
    const 调 = createToneStyle(tone)
    const [a, b, c] = getXPATuple(sen, yn)
    // assert.ok(diau, tone + '???')
    const IPA = {音: sen + yn, 声: sen, 韵: yn}
    const XPA = {音: a, 声: b, 韵: c}
    const 读 = Object.freeze({
      format(p: PinyinType, t: ToneType) {
        return 读[`to${p}`](t)
      },
      IPA,
      toIPA(t: ToneType) {
        return IPA.音 + (调[tMap[t] || '调序'] ?? '')
      },
      XPA,
      toXPA(t: ToneType) {
        return XPA.音 + (调[tMap[t] || '调序'] ?? '')
      },
    })
    return {读, 调}
  }
)

export const createJyinEntry = (
  sen: AnyInitial,
  yn: AnyFinal,
  tone: CSToneNo,
  shi = ''
): JyinEntry => {
  return {
    ...createSenyndiau(sen, yn, tone),
    释: shi,
  }
}
