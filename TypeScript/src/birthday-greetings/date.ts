export class XDate {
  static today() {
    return new XDate(new Date())
  }

  /**
   * 1982/05/09
   * @param yyyyMMdd
   */
  static fromPattern(yyyyMMdd: string) {
    const datePattern = /^(\d{4})\/(\d{2})\/(\d{2})$/
    const maybeMatch = datePattern.exec(yyyyMMdd)
    if (maybeMatch === null) {
      throw new Error('no date')
    }
    const [, year, month, day] = maybeMatch
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
    return new XDate(date)
  }

  private readonly date: Date

  constructor(date: Date) {
    this.date = date
  }

  getDay(): number {
    return this.date.getDate()
  }

  getMonth(): number {
    return 1 + this.date.getMonth()
  }

  isSameDay(anotherDate: XDate): boolean {
    return anotherDate.getDay() === this.getDay() && anotherDate.getMonth() === this.getMonth()
  }
}
