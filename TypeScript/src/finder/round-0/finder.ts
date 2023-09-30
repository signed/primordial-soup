import F from './f.js'
import { FT } from './ft.js'
import Thing from './thing.js'

export default class Finder {
  private _p: Thing[]

  constructor(p: Thing[]) {
    this._p = p
  }

  public find(ft: FT): F {
    const tr: F[] = []

    for (let i = 0; i < this._p.length - 1; i++) {
      for (let j = i + 1; j < this._p.length; j++) {
        const r: F = new F()
        if (this._p[i].birthDate.getTime() < this._p[j].birthDate.getTime()) {
          r.P1 = this._p[i]
          r.P2 = this._p[j]
        } else {
          r.P1 = this._p[j]
          r.P2 = this._p[i]
        }
        r.D = r.P2.birthDate.getTime() - r.P1.birthDate.getTime()
        tr.push(r)
      }
    }

    if (tr.length < 1) {
      return new F()
    }

    let answer: F = tr[0]
    for (const result of tr) {
      switch (ft) {
        case FT.One:
          if (result.D < answer.D) {
            answer = result
          }
          break

        case FT.Two:
          if (result.D > answer.D) {
            answer = result
          }
          break
      }
    }

    return answer
  }
}
