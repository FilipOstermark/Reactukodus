import { SudokuStateRepository, sudokuStateRepository } from "../../data/SudokuStateRepository"
import { BaseUseCase } from "./BaseUseCase"

export class UndoSudokuStateUseCase implements BaseUseCase {
  private sudokuStateRepository: SudokuStateRepository

  constructor(sudokuStateRepository: SudokuStateRepository) {
    this.sudokuStateRepository = sudokuStateRepository
  }

  public perform(): void {
    const prevState = this.sudokuStateRepository.getState().previousState
    if (prevState === undefined) {
      return
    }

    this.sudokuStateRepository.setState(prevState)
  }
}

export const undoSudokuStateUseCase: UndoSudokuStateUseCase =
  new UndoSudokuStateUseCase(sudokuStateRepository)
