import { SudokuStateRepository, sudokuStateRepository } from "../../../data/SudokuStateRepository"
import { updateSudokuState } from "../entity/SudokuState"

export class UpdateSudokuStateUseCase {
  private sudokuStateRepository: SudokuStateRepository

  constructor(sudokuStateRepository: SudokuStateRepository) {
    this.sudokuStateRepository = sudokuStateRepository
  }

  public perform(index: number, value: string, isNotesMode: boolean) {
    const prevState = this.sudokuStateRepository.getState()
    const newState = updateSudokuState(prevState, index, value, isNotesMode)

    this.sudokuStateRepository.setState(newState)
  }
}

export const updateSudokuStateUseCase: UpdateSudokuStateUseCase = 
  new UpdateSudokuStateUseCase(sudokuStateRepository)
