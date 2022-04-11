import {query} from '~/data/湘音检字'
import {csToneNoByTone} from './tones'

export const queryPinyin = (char: string) => {
  const item = query(char)
  return item?.map((x) => {
    return x.音標 + csToneNoByTone[x.調號 as keyof typeof csToneNoByTone]
  })
}

export type QueryResult = ReturnType<typeof queryPinyin>
