import { GameData } from './game-data.js'

export class FootballScoreStats {
  private readonly footballData: GameData

  constructor(gameData: GameData) {
    this.footballData = gameData
  }

  public teamTotal(teamName: string) {
    let total = 0
    const played = this.footballData.getAllPlayed()
    for (const game of played) {
      total += game.getTeamScore(teamName)
    }
    return total
  }
}
