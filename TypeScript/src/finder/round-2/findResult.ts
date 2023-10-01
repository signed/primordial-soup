import Person from './person.js'

export default class FindResult {
  public bornEarlier: Person | null
  public bornSameTimeOrLater: Person | null
  public ageDifferenceInMilliseconds: number

  constructor() {
    this.bornEarlier = null
    this.bornSameTimeOrLater = null
    this.ageDifferenceInMilliseconds = 0
  }
}
