export class Game {
  private homeTeam: string
  private homeTeamScore: number
  private awayTeam: string
  private awayTeamScore: number

  constructor(homeTeam: string, homeTeamScore: number, awayTeam: string, awayTeamScore: number) {
    this.homeTeam = homeTeam
    this.homeTeamScore = homeTeamScore
    this.awayTeam = awayTeam
    this.awayTeamScore = awayTeamScore
  }

  public getHomeTeam() {
    return this.homeTeam
  }

  public getHomeTeamScore() {
    return this.homeTeamScore
  }

  public getAwayTeam() {
    return this.awayTeam
  }

  public getAwayTeamScore() {
    return this.awayTeamScore
  }
}
