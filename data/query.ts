import yitizi from 'yitizi'
import {ToneType} from './tones'
import * as 汉语方音字汇 from './汉语方音字汇'
import * as 湘音检字 from './湘音检字'
import * as 长沙话音档 from './长沙话音档'

export enum Source {
  湘音检字 = '湘音检字',
  汉语方音字汇 = '汉语方音字汇',
  长沙话音档 = '长沙话音档',
}

export const sourceOptions = [
  {value: Source.湘音检字, label: '《湘音检字》1937'},
  {value: Source.长沙话音档, label: '《长沙话音档》1997'},
  {value: Source.汉语方音字汇, label: '《汉语方音字汇》2003'},
]

let queryMap = new Map([
  [Source.湘音检字, 湘音检字.query],
  [Source.长沙话音档, 长沙话音档.query],
  [Source.汉语方音字汇, 汉语方音字汇.queryCS],
])

export const queryPinyin = (
  char: string,
  shouldQueryVariants = false,
  source: Source,
  toneType?: ToneType
) => {
  let query = queryMap.get(source)!
  let result = query(char, toneType)
  if (!result.length && shouldQueryVariants) {
    for (const v of yitizi.get(char)) {
      let r = query(v, toneType)
      if (r.length) {
        result = r
        break
      }
    }
  }
  return result
}

export const queryPinyinAll = (
  char: string,
  shouldQueryVariants = false,
  toneType?: ToneType
): [Source, QueryResult][] => {
  return [...queryMap.keys()].map((k) => [
    k,
    queryPinyin(char, shouldQueryVariants, k, toneType),
  ])
}

export type QueryResult = ReturnType<typeof queryPinyin>
