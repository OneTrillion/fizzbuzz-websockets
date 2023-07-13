import { GameData } from "../types/gameData";

import { IGameDataRepository } from "./IGameDataRepository";

export class InMemoryRepository implements IGameDataRepository {
  inMemDB: Map<string, GameData>;

  constructor() {
    this.inMemDB = new Map<string, GameData>();
  }

  public getHighScore(id: string): number {
    const highScore = this.inMemDB.get(id)?.highScore;

    if (highScore === undefined) {
      return 0;
    }

    return highScore;
  }

  public getPreviousServerPlay(id: string): number {
    const previousMove = this.inMemDB.get(id)?.lastServerPlay;

    if (previousMove === undefined) {
      return 0;
    }

    return previousMove;
  }

  public getGameData(id: string): GameData {
    const gameData = this.inMemDB.get(id);

    if (gameData === undefined) {
      const emptyGameData: GameData = {
        highScore: 0,
        lastServerPlay: 0,
      };
      return emptyGameData;
    }

    return gameData;
  }

  public save(id: string, gameData: GameData): GameData {
    this.inMemDB.set(id, gameData);
    return gameData;
  }
}
