import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { GameControlRepository, gameControlRepository } from "../../../data/GameControlRepository"
import { sudokuStateRepository } from "../../../data/SudokuStateRepository"
import { BaseUseCase } from "../BaseUseCase"

export class ShowHighscoreUseCase implements BaseUseCase {
  private gameControlRepository: GameControlRepository

  constructor(gameControlRepository: GameControlRepository) {
    this.gameControlRepository = gameControlRepository
  }

  public perform(difficulty: Difficulty | undefined = undefined) {
    const effectiveDifficulty = 
      difficulty ?? sudokuStateRepository.getState().difficulty
    this.gameControlRepository.setHighscoreViewDifficulty(effectiveDifficulty)
    this.gameControlRepository.setViewingHighscore(true)
  }
}

export const showHighscoreUseCase: ShowHighscoreUseCase = 
  new ShowHighscoreUseCase(gameControlRepository)
