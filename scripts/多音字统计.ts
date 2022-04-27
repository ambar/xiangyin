import * as d3 from '../data/汉语方音字汇'
import * as d1 from '../data/湘音检字'
import * as d2 from '../data/长沙话音档'

let count = (rawItemsByChar: Map<string, any>, len: number) => {
  let doinzi = Object.fromEntries(
    [...rawItemsByChar.entries()].filter((x) => x[1].length >= len)
  )
  console.info(Object.keys(doinzi).join(''))
  return doinzi
}

/*
廁差哆施射陂洒踦咳不呼哪那哈咬斡説说繆缪累个敦參参搶
易夜外潑便撇噴磨蒙會座在釘盪稱癩累溜插撞像澄差擇重射惹咬轉嘎挾倦覺傳蝦下行咯和號
差閒華行亨句參載著間
*/
count(d1.rawItemsByChar, 5)
count(d2.rawItemsByChar, 3)
count(d3.rawItemsByChar, 3)
