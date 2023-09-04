import { expect, test } from 'vitest'
import { FootballScoreStats } from './football-score-stats.js'

test('totals football scores for team', () => {
  const stats = new FootballScoreStats()
  expect(stats.teamTotal('Liverpool')).toBe(6)
})
