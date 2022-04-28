import {JyinEntry, PinyinType} from '~/data/types'
import {rawItems} from '~/data/长沙话音档'

export const playKey: PinyinType = 'IPA'
const configBySyllable = Object.fromEntries(
  rawItems.filter((x) => x.號).map((x) => [x.规范.读.format(playKey), x])
)
const getConfig = (syllable: string) => configBySyllable[normSyllable(syllable)]

/** 有音频文件定义 */
export const canPlay = (syllable: string) => {
  return !!getConfig(syllable)
}

/** 有音频文件定义 */
export const canPlayJyinEntry = (item: JyinEntry) => {
  const x = getConfig(item.读.format(playKey))
  return !!x
}

export const isJyinEntryFlawed = (item: JyinEntry) => {
  const x = getConfig(item.读.format(playKey))
  return !x || !x.號 || x.元.disabled || x.元.flawed
}

const normSyllable = (syllable: string) => {
  // 兼容其他字典
  return (
    syllable
      ?.replace(/ʻ/g, 'ʰ')
      .replace('ʨ', 'tɕ')
      .replace('ʦ', 'ts')
      // 不使用 normSyllable 而是 playKey 替代为 XPA？（有些匹配问题，如下以及 ɿ/i）
      // 汉语方音字汇
      .replace('z', 'ʐ')
      .replace('ɤ', 'ə')
      .replace('ɸ', 'f')
      .replace('ɤ̃', 'ẽ')
      // 湘音检字
      .replace('ɹ', 'ʐ')
      .replace('ȵ̍', 'n')
      .replace('ɘ', 'ə')
      .replace('ã', 'an')
      .replace('l̃', 'l')
  )
}

let audio: HTMLAudioElement
export const playAudio = (syllable: number | string) => {
  const no =
    typeof syllable === 'number'
      ? syllable
      : getConfig(normSyllable(syllable))?.號
  if (no) {
    const src = `/audio/syllables/F${String(no).padStart(5, '0')}.mp3`
    if (audio) {
      audio.pause()
      audio.src = src
    } else {
      audio = new Audio(src)
    }
    Promise.resolve(audio.play()).catch(() => {})
  }
}

/** 有音频文件定义 */
export const playJyinEntry = (item: JyinEntry) => {
  playAudio(item.读.format(playKey))
}
