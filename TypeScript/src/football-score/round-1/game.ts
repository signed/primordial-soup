export class Game {
  private readonly homeTeam: string
  private readonly homeTeamScore: number
  private readonly awayTeam: string
  private readonly awayTeamScore: number

  constructor(homeTeam: string, homeTeamScore: number, awayTeam: string, awayTeamScore: number) {
    this.homeTeam = homeTeam
    this.homeTeamScore = homeTeamScore
    this.awayTeam = awayTeam
    this.awayTeamScore = awayTeamScore
  }

  getTeamScore(teamName: string) {
    let total: number = 0
    if (this.homeTeam === teamName) {
      total = this.homeTeamScore
    }
    if (this.awayTeam === teamName) {
      total = this.awayTeamScore
    }
    return total
  }
}
