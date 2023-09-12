import { describe, expect, test } from 'vitest'
import { lineFilter, parseLine, teamWithSmallestDifference } from './team-with-smallest.difference.js'

describe('Part Two: Soccer League Table', () => {
  describe('ignore the header line', () => {
    test('ignore separator line', () => {
      expect(lineFilter('   -------------------------------------------------------', -1)).toBe(false)
    })
    test('keep all other lines', () => {
      expect(lineFilter('   16. Bolton          38     9  13  16    44  -  62    40', 17)).toBe(true)
    })
  })

  test('parse soccer table line', () => {
    expect(parseLine('    1. Arsenal         38    26   9   3    79  -  36    87')).toEqual({
      team: 'Arsenal',
      scoredFor: 79,
      scoredAgainst: 36,
    })
  })

  test('team with smallest difference', () => {
    const result = teamWithSmallestDifference()
    expect(result.team).toEqual('Aston_Villa')
    expect(result.pivot).toEqual(1)
  })
})
