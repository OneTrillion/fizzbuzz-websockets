import { GameData } from "../types/gameData";

export interface IGameDataRepository {
  getHighScore: (id: string) => number;
  getPreviousServerPlay: (id: string) => number;
  getGameData: (id: string) => GameData;
  save: (id: string, gameData: GameData) => GameData;
}
