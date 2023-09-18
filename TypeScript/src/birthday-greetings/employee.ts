import { XDate } from './date.js'

export class Employee {
  private readonly birthDate: XDate
  private readonly lastName: string
  private readonly firstName: string
  private readonly email: string

  constructor(firstName: string, lastName: string, birthDate: string, email: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.birthDate = XDate.fromPattern(birthDate)
    this.email = email
  }

  public isBirthday(today: XDate): boolean {
    return today.isSameDay(this.birthDate)
  }

  public getEmail(): string {
    return this.email
  }

  public getFirstName(): string {
    return this.firstName
  }

  public toString(): string {
    return `Employee ${this.firstName} ${this.lastName} <${this.email}> born ${this.birthDate}`
  }
}
