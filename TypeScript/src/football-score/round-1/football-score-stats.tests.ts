import { expect, test } from 'vitest'
import { FootballData } from './football-data.js'
import { FootballScoreStats } from './football-score-stats.js'

test('totals football scores for team', () => {
  const stats = new FootballScoreStats(new FootballData())
  expect(stats.teamTotal('Liverpool')).toBe(6)
})
