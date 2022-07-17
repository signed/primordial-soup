import { Game } from './game.js'

export class FootballData {
  public static getAllPlayed() {
    return [
      new Game('Liverpool', 2, 'Everton', 0),
      new Game('Aston Villa', 1, 'Liverpool', 1),
      new Game('Liverpool', 3, 'West Ham', 1),
    ]
  }
}
