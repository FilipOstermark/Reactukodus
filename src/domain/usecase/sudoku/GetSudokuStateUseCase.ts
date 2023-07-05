import { SudokuStateRepository, sudokuStateRepository } from "../../../data/SudokuStateRepository"
import { BaseUseCase } from "../BaseUseCase"
import { ObservableUseCase } from "../ObservableUseCase"

class GetSudokuStateUseCase implements BaseUseCase, ObservableUseCase {
  private sudokuStateRepository: SudokuStateRepository

  constructor(sudokuStateRepository: SudokuStateRepository) {
    this.sudokuStateRepository = sudokuStateRepository
  }

  public perform() {
    return this.sudokuStateRepository.getState()
  }

  public perform$() {
    return this.sudokuStateRepository.getState$()
  }
}

export const getSudokuStateUseCase: GetSudokuStateUseCase = 
  new GetSudokuStateUseCase(sudokuStateRepository)
