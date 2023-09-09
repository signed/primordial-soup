import { describe, expect, test } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'

function minimumIn<T extends { pivot: number }>(
  pathToData: string,
  candidates: (fileContent: string) => T[],
  sentinel: T,
) {
  const fileContent = readFileSync(pathToData).toString()
  return candidates(fileContent).reduce((acc, cur) => {
    return cur.pivot < acc?.pivot ? cur : acc
  }, sentinel)
}

const extractDataLines = (fileContent: string, lineFilter: any) =>
  fileContent
    .split('\n')
    .filter((_line, lineNumber) => lineNumber !== 0)
    .filter((line) => line.trim() !== '')
    .filter(lineFilter)

{
  const pathToData = path.resolve('./src/data-munging/weather.dat')

  const lineFilter = (line: string, _index: number) => !line.startsWith('  mo')

  const parseLine = (s: string) => {
    const columns = s.trim().split(/\s+/)
    const day = columns[0]
    const maximum = Number.parseFloat(columns[1])
    const minimum = Number.parseFloat(columns[2])
    return { day, minimum, maximum }
  }

  const lineToValue = (line: string) => {
    const measurement = parseLine(line)
    const spread = measurement.maximum - measurement.minimum
    return { day: measurement.day, pivot: spread }
  }

  const dayWithSmallestSpread = () => {
    function candidates(fileContent: string) {
      return extractDataLines(fileContent, lineFilter).map(lineToValue)
    }
    const sentinel = { day: 'nope', pivot: Number.MAX_VALUE }
    return minimumIn(pathToData, candidates, sentinel)
  }

  describe('Part One: Weather Data', () => {
    test('read weather data from data file ignoring header, summary and empty lines', () => {
      const fileContent = readFileSync(pathToData).toString()
      const dataLines = extractDataLines(fileContent, (line: string, _index: number) => !line.startsWith('  mo'))
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

  const lineFilter = (line: string, _index: number) => !line.startsWith('   ---')

  const parseLine = (s: string) => {
    const columns = s.trim().replace('-', '').split(/\s+/)
    const team = columns[1]
    const scoredFor = Number.parseInt(columns[6])
    const scoredAgainst = Number.parseInt(columns[7])
    return { team, scoredFor, scoredAgainst }
  }

  const lineToValue = (line: string) => {
    const measurement = parseLine(line)
    const difference = Math.abs(measurement.scoredAgainst - measurement.scoredFor)
    return { team: measurement.team, pivot: difference }
  }

  const teamWithSmallestDifference = () => {
    function candidates(fileContent: string) {
      return extractDataLines(fileContent, lineFilter).map(lineToValue)
    }
    const sentinel = { team: 'nope', pivot: Number.MAX_VALUE }
    return minimumIn(pathToData, candidates, sentinel)
  }

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
}
