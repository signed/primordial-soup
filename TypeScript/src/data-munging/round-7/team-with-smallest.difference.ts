import { minimumIn, valueExtractorFor } from './core.js'
import path from 'node:path'

const pathToData = path.resolve('./src/data-munging/football.dat')
export const lineFilter = (line: string, _index: number) => !line.startsWith('   ---')
export const parseLine = (s: string) => {
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
export const teamWithSmallestDifference = () => {
  const values = valueExtractorFor(pathToData, lineFilter, lineToValue)
  return minimumIn(values, { team: 'nope', pivot: Number.MAX_VALUE })
}
