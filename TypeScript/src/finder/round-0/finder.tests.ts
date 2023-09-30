import { describe, test, beforeEach, expect } from 'vitest'
import Finder from './finder.js'
import { FT } from './ft.js'
import Thing from './thing.js'

describe('Finder', () => {
  let sue: Thing
  let greg: Thing
  let sarah: Thing
  let mike: Thing

  beforeEach(() => {
    sue = new Thing()
    sue.name = 'Sue'
    sue.birthDate = new Date(50, 0, 1)

    greg = new Thing()
    greg.name = 'Greg'
    greg.birthDate = new Date(52, 5, 1)

    sarah = new Thing()
    sarah.name = 'Sarah'
    sarah.birthDate = new Date(82, 0, 1)

    mike = new Thing()
    mike.name = 'Mike'
    mike.birthDate = new Date(79, 0, 1)
  })

  test('returns Empty Results When Given Empty List', () => {
    const list: Thing[] = []
    const finder = new Finder(list)

    const result = finder.find(FT.One)

    expect(result.P1).toBeNull()
    expect(result.P2).toBeNull()
  })

  test('returns Empty Results When Given One FT', () => {
    const list: Thing[] = [sue]
    const finder = new Finder(list)

    const result = finder.find(FT.One)

    expect(result.P1).toBeNull()
    expect(result.P2).toBeNull()
  })

  test('returns One Two For Two FTs', () => {
    const list: Thing[] = [sue, greg]
    const finder = new Finder(list)

    const result = finder.find(FT.One)

    expect(result.P1).toBe(sue)
    expect(result.P2).toBe(greg)
  })

  test('returns Two Two For Two FTs', () => {
    const list: Thing[] = [mike, greg]
    const finder = new Finder(list)

    const result = finder.find(FT.Two)

    expect(result.P1).toBe(greg)
    expect(result.P2).toBe(mike)
  })

  test('returns Two Two For Four FTs', () => {
    const list: Thing[] = [sue, sarah, mike, greg]
    const finder = new Finder(list)

    const result = finder.find(FT.Two)

    expect(result.P1).toBe(sue)
    expect(result.P2).toBe(sarah)
  })

  test('returns One Two For Four FTs', () => {
    const list: Thing[] = [sue, sarah, mike, greg]
    const finder = new Finder(list)

    const result = finder.find(FT.One)

    expect(result.P1).toBe(sue)
    expect(result.P2).toBe(greg)
  })
})
