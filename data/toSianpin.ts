import {changeTone, CSToneNo} from './tones'
import {QueryOptions} from './types'
import {AnyFinal, AnyInitial, toSianpinA} from './湘拼'

/**
 * 湘拼转换
 */
export const toSianpin = (
  ipaSen: AnyInitial,
  ipaYn: AnyFinal,
  tone: CSToneNo,
  {pinyinType = 'IPA', toneType = 'CSToneNo'}: QueryOptions = {}
) => {
  if (pinyinType === 'XPA') {
    const [a, b, c] = toSianpinA(ipaSen, ipaYn)
    return [a, b, c, changeTone(tone, 'CSToneNo', toneType)] as const
  }
  return [
    ipaSen + ipaYn,
    ipaSen,
    ipaYn,
    changeTone(tone, 'CSToneNo', toneType),
  ] as const
}
