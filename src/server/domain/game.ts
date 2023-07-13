import { IGameDataRepository } from "../repository/IGameDataRepository";

export const handleUserInput = (
  input: string,
  sessionID: string,
  repository: IGameDataRepository
): string => {
  if (input === "!highscore") {
    return `Your highscore is: ${repository.getHighScore(sessionID)}`;
  }
  return playRound(input, sessionID, repository);
};

const updateHighScore = (highScore: number, currentScore: number): number => {
  if (currentScore > highScore) return currentScore;

  return highScore;
};

const playRound = (
  input: string,
  sessionID: string,
  repository: IGameDataRepository
): string => {
  const gameData = repository.getGameData(sessionID);
  const prevServerPlay = repository.getPreviousServerPlay(sessionID);
  const correctAnswer = calcNextAnswer(prevServerPlay);

  if (input === correctAnswer) {
    const highScore = updateHighScore(gameData.highScore, prevServerPlay + 1);
    gameData.highScore = highScore;
    gameData.lastServerPlay = prevServerPlay + 2;

    repository.save(sessionID, gameData);
    return calcNextAnswer(prevServerPlay + 1);
  } else {
    gameData.lastServerPlay = 0;

    repository.save(sessionID, gameData);
    return "You lose";
  }
};

const calcNextAnswer = (prevAnswer: number): string => {
  const nextNumber = prevAnswer + 1;

  if (nextNumber % 3 === 0 && nextNumber % 5 === 0) {
    return "FizzBuzz";
  } else if (nextNumber % 3 == 0) {
    return "Fizz";
  } else if (nextNumber % 5 == 0) {
    return "Buzz";
  } else {
    return String(nextNumber);
  }
};
