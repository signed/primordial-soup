import path from 'node:path'
import { minimumIn, valueExtractorFor } from './core.js'

export const pathToData = path.resolve('./src/data-munging/weather.dat')
const lineFilter = (line: string, _index: number) => !line.startsWith('  mo')
export const parseLine = (s: string) => {
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
export const dayWithSmallestSpread = () => {
  const values = valueExtractorFor(pathToData, lineFilter, lineToValue)
  return minimumIn(values, { day: 'nope', pivot: Number.MAX_VALUE })
}
