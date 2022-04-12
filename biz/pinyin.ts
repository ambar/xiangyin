import * as 汉语方音字汇 from '~/data/汉语方音字汇'
import * as 湘音检字 from '~/data/湘音检字'
import {queryVariants} from '~/data/通用规范汉字表'

export enum Source {
  湘音检字 = '湘音检字',
  汉语方音字汇 = '汉语方音字汇',
}

export const sourceOptions = [
  {value: Source.湘音检字, label: '《湘音检字》1937'},
  {value: Source.汉语方音字汇, label: '《汉语方音字汇》2003'},
]

let queryMap = new Map([
  [Source.湘音检字, 湘音检字.query],
  [Source.汉语方音字汇, 汉语方音字汇.queryCS],
])

export const queryPinyin = (
  char: string,
  shouldQueryVariants = false,
  source: Source
) => {
  let query = queryMap.get(source)!
  let result = query(char)
  if (!result.length && shouldQueryVariants) {
    for (const v of queryVariants(char)) {
      if ((result = query(v))) {
        break
      }
    }
  }
  return result
}

export type QueryResult = ReturnType<typeof queryPinyin>
