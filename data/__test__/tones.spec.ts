import * as t from '../tones'
import {changeTone, ToneTypes} from '../tones'

const csTones: t.CSToneNo[] = [1, 2, 3, 4, 5, 6]

test('changeTone: CSToneNo', () => {
  expect(
    csTones.map((d) =>
      ToneTypes.map((t1) =>
        [d, t1, '->', changeTone(d, 'CSToneNo', t1)].join(' ')
      )
    )
  ).toMatchSnapshot()
})

const octets = Object.keys(t.octetToneNo2csToneNo)

test('changeTone: OctetToneNo', () => {
  expect(
    octets.map((d) =>
      ToneTypes.map((t1) =>
        [d, t1, '->', changeTone(d, 'OctetToneNo', t1)].join(' ')
      )
    )
  ).toMatchSnapshot()
})
