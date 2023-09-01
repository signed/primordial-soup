import { expect, test } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const pathToData = path.resolve('./src/data-munging/weather.dat')

const readMeasurementsIn = (fileContent: string) =>
  fileContent
    .split('\n')
    .filter((_line, lineNumber) => lineNumber !== 0)
    .filter((line) => line.trim() !== '')
    .filter((line) => !line.startsWith('  mo'))

test('read weather data from data file ignoring header, summary and empty lines', () => {
  const fileContent = readFileSync(pathToData).toString()
  const dataLines = readMeasurementsIn(fileContent)
  expect(dataLines).toHaveLength(30)
})

function parseLine(s: string) {
  const columns = s.trim().split(/\s+/)

  const day = columns[0]
  const maximum = Number.parseFloat(columns[1])
  const minimum = Number.parseFloat(columns[2])
  return { day, minimum, maximum }
}

test('parse daily data point', () => {
  expect(
    parseLine('   1  88    59    74          53.8       0.00 F       280  9.6 270  17  1.6  93 23 1004.5'),
  ).toEqual({ day: '1', minimum: 59, maximum: 88 })
  expect(
    parseLine('   9  86    32*   59       6  61.5       0.00         240  7.6 220  12  6.0  78 46 1018.6'),
  ).toEqual({ day: '9', minimum: 32, maximum: 86 })
})

function dayWithSmallestSpread() {
  const fileContent = readFileSync(pathToData).toString()
  const dataLines = readMeasurementsIn(fileContent)
  const dayWithMinSpread = dataLines
    .map((line) => parseLine(line))
    .map((measurement) => {
      const spread = measurement.maximum - measurement.minimum
      return { day: measurement.day, spread }
    })
    .reduce(
      (acc, cur) => {
        if (acc === undefined) {
          return cur
        }

        return cur.spread < acc?.spread ? cur : acc
      },
      { day: 'nope', spread: Number.MAX_VALUE },
    )
  return dayWithMinSpread
}

test('day with smallest temperature spread', () => {
  const result = dayWithSmallestSpread()

  expect(result.day).toEqual('14')
  expect(result.spread).toEqual(2)
})
