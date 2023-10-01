import { beforeEach, describe, expect, test } from 'vitest'
import Finder from './finder.js'
import { FindOption } from './findOption.js'
import Person from './person.js'

describe('Finder', () => {
  let sue: Person
  let greg: Person
  let sarah: Person
  let mike: Person

  beforeEach(() => {
    sue = new Person()
    sue.name = 'Sue'
    sue.birthDate = new Date(50, 0, 1)

    greg = new Person()
    greg.name = 'Greg'
    greg.birthDate = new Date(52, 5, 1)

    mike = new Person()
    mike.name = 'Mike'
    mike.birthDate = new Date(79, 0, 1)

    sarah = new Person()
    sarah.name = 'Sarah'
    sarah.birthDate = new Date(82, 0, 1)
  })

  test('returns Empty Results When Given Empty List', () => {
    const list: Person[] = []
    const finder = new Finder(list)

    const result = finder.find(FindOption.SmallestAgeDifference)

    expect(result.bornEarlier).toBeNull()
    expect(result.bornSameTimeOrLater).toBeNull()
  })

  test('returns Empty Results When Given One FT', () => {
    const list: Person[] = [sue]
    const finder = new Finder(list)

    const result = finder.find(FindOption.SmallestAgeDifference)

    expect(result.bornEarlier).toBeNull()
    expect(result.bornSameTimeOrLater).toBeNull()
  })

  test('returns One Two For Two FTs', () => {
    const list: Person[] = [sue, greg]
    const finder = new Finder(list)

    const result = finder.find(FindOption.SmallestAgeDifference)

    expect(result.bornEarlier).toBe(sue)
    expect(result.bornSameTimeOrLater).toBe(greg)
  })

  test('returns Two Two For Two FTs', () => {
    const list: Person[] = [mike, greg]
    const finder = new Finder(list)

    const result = finder.find(FindOption.LargestAgeDifference)

    expect(result.bornEarlier).toBe(greg)
    expect(result.bornSameTimeOrLater).toBe(mike)
  })

  test('returns Two Two For Four FTs', () => {
    const list: Person[] = [sue, sarah, mike, greg]
    const finder = new Finder(list)

    const result = finder.find(FindOption.LargestAgeDifference)

    expect(result.bornEarlier).toBe(sue)
    expect(result.bornSameTimeOrLater).toBe(sarah)
  })

  test('returns One Two For Four FTs', () => {
    const list = [sue, sarah, mike, greg]
    const finder = new Finder(list)
    const result = finder.find(FindOption.SmallestAgeDifference)

    expect(result.bornEarlier).toBe(sue)
    expect(result.bornSameTimeOrLater).toBe(greg)
  })
})
