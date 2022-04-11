import {query} from '~/data/湘音检字'
import {queryVariants} from '~/data/通用规范汉字表'
import {csToneNoByTone} from './tones'

export const queryPinyin = (char: string, shouldQueryVariants = false) => {
  let item = query(char)
  if (!item && shouldQueryVariants) {
    for (const v of queryVariants(char)) {
      if ((item = query(v))) {
        break
      }
    }
  }
  return item?.map((x) => {
    return x.音標 + csToneNoByTone[x.調號 as keyof typeof csToneNoByTone]
  })
}

export type QueryResult = ReturnType<typeof queryPinyin>
