import {JyinEntry, PinyinType} from '~/data/types'
import {rawItems} from '~/data/长沙话音档'

const playKey: PinyinType = 'IPA'
const configBySyllable = Object.fromEntries(
  rawItems.filter((x) => x.號).map((x) => [x.规范.读.format(playKey), x])
)

/** 有音频文件定义 */
export const canPlay = (syllable: string) => {
  return !!configBySyllable[syllable]
}

/** 有音频文件定义 */
export const canPlayJyinEntry = (item: JyinEntry) => {
  const x = configBySyllable[item.读.format(playKey)]
  return !!x
}

export const isJyinEntryFlawed = (item: JyinEntry) => {
  const injie = item.读.format(playKey)
  const x = configBySyllable[injie]
  return !x || !x.號 || x.元.disabled || x.元.flawed
}

const normSyllable = (syllable: string) => {
  // 兼容其他字典
  return syllable
    ?.replace(/ʻ/g, 'ʰ')
    .replace('ʨ', 'tɕ')
    .replace('ʦ', 'ts')
    .replace('z', 'ʐ')
    .replace('ɤ', 'ə')
}

let audio: HTMLAudioElement
export const playAudio = (syllable: number | string) => {
  const no =
    typeof syllable === 'number'
      ? syllable
      : configBySyllable[normSyllable(syllable)]?.號
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
