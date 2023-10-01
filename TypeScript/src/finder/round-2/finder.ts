import FindResult from './findResult.js'
import { FindOption } from './findOption.js'
import Person from './person.js'

export default class Finder {
  private readonly persons: Person[]

  constructor(p: Person[]) {
    this.persons = p
  }

  public find(option: FindOption): FindResult {
    const candidates = this.candidates()
    if (candidates.length < 1) {
      return new FindResult()
    }

    let result: FindResult = candidates[0]
    for (const current of candidates) {
      switch (option) {
        case FindOption.SmallestAgeDifference:
          if (current.ageDifferenceInMilliseconds < result.ageDifferenceInMilliseconds) {
            result = current
          }
          break

        case FindOption.LargestAgeDifference:
          if (current.ageDifferenceInMilliseconds > result.ageDifferenceInMilliseconds) {
            result = current
          }
          break
      }
    }

    return result
  }

  private candidates() {
    const candidates: FindResult[] = []

    for (let i = 0; i < this.persons.length - 1; i++) {
      const left = this.persons[i]
      for (let j = i + 1; j < this.persons.length; j++) {
        const right = this.persons[j]
        const result: FindResult = new FindResult()

        const leftBornEarlier = left.birthDate.getTime() < right.birthDate.getTime()
        if (leftBornEarlier) {
          result.bornEarlier = left
          result.bornSameTimeOrLater = right
        } else {
          result.bornEarlier = right
          result.bornSameTimeOrLater = left
        }
        result.ageDifferenceInMilliseconds =
          result.bornSameTimeOrLater.birthDate.getTime() - result.bornEarlier.birthDate.getTime()
        candidates.push(result)
      }
    }
    return candidates
  }
}
