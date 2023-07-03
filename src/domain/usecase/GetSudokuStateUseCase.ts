import { SudokuStateRepository, sudokuStateRepository } from "../../data/SudokuStateRepository"

class GetSudokuStateUseCase {
  private sudokuStateRepository: SudokuStateRepository

  constructor(sudokuStateRepository: SudokuStateRepository) {
    this.sudokuStateRepository = sudokuStateRepository
  }

  public perform() {
    return this.sudokuStateRepository.getState()
  }
}

export const getSudokuStateUseCase: GetSudokuStateUseCase = 
  new GetSudokuStateUseCase(sudokuStateRepository)