import * as 汉语方音字汇 from '~/data/汉语方音字汇'
import * as 湘音检字 from '~/data/湘音检字'
import * as 长沙话音档 from '~/data/长沙话音档'

let counters = [
  [
    '湘音检字',
    () => {
      const set = new Set(湘音检字.items.map((x) => x.字甲).filter(Boolean))
      const setAll = new Set(
        湘音检字.items
          .map((x) => [x.字甲, x.字乙])
          .flat()
          .filter(Boolean)
      )
      return [set.size, setAll.size].join(', ')
    },
  ],
  [
    '长沙话音档',
    () => {
      const set = new Set(长沙话音档.items.map((x) => x.例字).flat())
      return set.size
    },
  ],
  [
    '汉语方音字汇',
    () => {
      const set = new Set(
        汉语方音字汇.items
          .filter((x) => x.湘.长沙)
          .map((x) => x.字)
          .flat()
      )
      const setAll = new Set(汉语方音字汇.items.map((x) => x.字).flat())
      return [set.size, setAll.size].join(', ')
    },
  ],
] as const

/*
湘音检字 12747, 13543
长沙话音档  3696
汉语方音字汇 2756, 4185
*/
for (const [key, fn] of counters) {
  console.info(key, fn())
}
