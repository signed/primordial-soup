import { describe, expect, test } from 'vitest'
import { readFileSync } from 'node:fs'
import { extractDataLines } from './core.js'
import { dayWithSmallestSpread, parseLine, pathToData } from './day-with-smallest.spread.js'

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
