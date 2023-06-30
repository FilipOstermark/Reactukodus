import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { SudokuStateRepository, sudokuStateRepository } from "../../data/SudokuStateRepository"
import { createDefaultSudokuState } from "../../common/utils-sudoku"

export class ResetSudokuStateUseCase {
  private sudokuStateRepository: SudokuStateRepository

  constructor(sudokuStateRepository: SudokuStateRepository) {
    this.sudokuStateRepository = sudokuStateRepository
  }

  public perform(difficulty: Difficulty): void {
    this.sudokuStateRepository.setState(
      createDefaultSudokuState(difficulty)
    )
  }
}

export const resetSudokuStateUseCase: ResetSudokuStateUseCase = 
  new ResetSudokuStateUseCase(sudokuStateRepository)
