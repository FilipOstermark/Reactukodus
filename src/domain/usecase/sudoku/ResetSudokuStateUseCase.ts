import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { SudokuStateRepository, sudokuStateRepository } from "../../../data/SudokuStateRepository"
import { createDefaultSudokuState } from "../../../common/utils-sudoku"
import { GameControlRepository, gameControlRepository } from "../../../data/GameControlRepository"
import { BaseUseCase } from "../BaseUseCase"

export class ResetSudokuStateUseCase implements BaseUseCase {
  private sudokuStateRepository: SudokuStateRepository
  private gameControlRepository: GameControlRepository

  constructor(
    sudokuStateRepository: SudokuStateRepository,
    gameControlRepository: GameControlRepository
  ) {
    this.sudokuStateRepository = sudokuStateRepository
    this.gameControlRepository = gameControlRepository
  }

  public perform(difficulty: Difficulty): void {
    this.sudokuStateRepository.setState(
      createDefaultSudokuState(difficulty)
    )
    this.gameControlRepository.setHighscoreViewDifficulty(difficulty)
  }
}

export const resetSudokuStateUseCase: ResetSudokuStateUseCase = 
  new ResetSudokuStateUseCase(
    sudokuStateRepository, 
    gameControlRepository
  )
