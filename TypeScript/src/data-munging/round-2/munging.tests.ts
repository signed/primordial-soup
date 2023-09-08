import { describe, expect, test } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'

{
  const pathToData = path.resolve('./src/data-munging/weather.dat')

  const readMeasurementsIn = (fileContent: string) =>
    fileContent
      .split('\n')
      .filter((_line, lineNumber) => lineNumber !== 0)
      .filter((line) => line.trim() !== '')
      .filter((line) => !line.startsWith('  mo'))

  function parseLine(s: string) {
    const columns = s.trim().split(/\s+/)

    const day = columns[0]
    const maximum = Number.parseFloat(columns[1])
    const minimum = Number.parseFloat(columns[2])
    return { day, minimum, maximum }
  }

  function dayWithSmallestSpread() {
    function candidates(fileContent: string) {
      return readMeasurementsIn(fileContent)
        .map(parseLine)
        .map((measurement) => {
          const boom = measurement.maximum - measurement.minimum
          return { day: measurement.day, pivot: boom }
        })
    }

    const fileContent = readFileSync(pathToData).toString()
    return candidates(fileContent).reduce(
      (acc, cur) => {
        return cur.pivot < acc?.pivot ? cur : acc
      },
      { day: 'nope', pivot: Number.MAX_VALUE },
    )
  }

  describe('Part One: Weather Data', () => {
    test('read weather data from data file ignoring header, summary and empty lines', () => {
      const fileContent = readFileSync(pathToData).toString()
      const dataLines = readMeasurementsIn(fileContent)
      expect(dataLines).toHaveLength(30)
    })

    test('parse daily data point', () => {
      expect(
        parseLine('   1  88    59    74          53.8       0.00 F       280  9.6 270  17  1.6  93 23 1004.5'),
      ).toEqual({ day: '1', minimum: 59, maximum: 88 })
      expect(
        parseLine('   9  86    32*   59       6  61.5       0.00         240  7.6 220  12  6.0  78 46 1018.6'),
      ).toEqual({ day: '9', minimum: 32, maximum: 86 })
    })

    test('day with smallest temperature spread', () => {
      const result = dayWithSmallestSpread()

      expect(result.day).toEqual('14')
      expect(result.pivot).toEqual(2)
    })
  })
}

{
  const pathToData = path.resolve('./src/data-munging/football.dat')

  function parseFootballTableLine(s: string) {
    const columns = s.trim().replace('-', '').split(/\s+/)
    const team = columns[1]
    const scoredFor = Number.parseInt(columns[6])
    const scoredAgainst = Number.parseInt(columns[7])
    return { team, scoredFor, scoredAgainst }
  }

  const footballLineFilter = (line: string, index: number) => {
    if (index === 0) {
      return false
    }
    if (line.startsWith('   ---')) {
      return false
    }
    return true
  }

  const readGoalDifferenceIn = (fileContent: string) => fileContent.split('\n').filter(footballLineFilter)

  function teamWithSmallestDifference() {
    function candidates(fileContent: string) {
      return readGoalDifferenceIn(fileContent)
        .map(parseFootballTableLine)
        .map((measurement) => {
          const boom = Math.abs(measurement.scoredAgainst - measurement.scoredFor)
          return { team: measurement.team, pivot: boom }
        })
    }

    const fileContent = readFileSync(pathToData).toString()
    return candidates(fileContent).reduce(
      (acc, cur) => {
        return cur.pivot < acc?.pivot ? cur : acc
      },
      { team: 'nope', pivot: Number.MAX_VALUE },
    )
  }

  describe('Part Two: Soccer League Table', () => {
    describe('ignore the header line', () => {
      test('football line filter', () => {
        expect(footballLineFilter('not important', 0)).toBe(false)
      })
      test('ignore separator line', () => {
        expect(footballLineFilter('   -------------------------------------------------------', -1)).toBe(false)
      })
      test('keep all other lines', () => {
        expect(footballLineFilter('   16. Bolton          38     9  13  16    44  -  62    40', 17)).toBe(true)
      })
    })

    test('parse soccer table line', () => {
      expect(parseFootballTableLine('    1. Arsenal         38    26   9   3    79  -  36    87')).toEqual({
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
}
