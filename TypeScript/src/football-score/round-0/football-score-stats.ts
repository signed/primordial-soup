import { FootballData } from './football-data.js'

export class FootballScoreStats {
  public teamTotal(teamName: string) {
    let total = 0
    const played = FootballData.getAllPlayed()
    for (const game of played) {
      if (game.getHomeTeam() === teamName) {
        total += game.getHomeTeamScore()
      }
      if (game.getAwayTeam() === teamName) {
        total += game.getAwayTeamScore()
      }
    }
    return total
  }
}
