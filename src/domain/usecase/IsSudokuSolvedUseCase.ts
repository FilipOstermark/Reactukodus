import { Observable, distinctUntilChanged, map } from "rxjs"
import { SudokuStateRepository, sudokuStateRepository } from "../../data/SudokuStateRepository"
import { validateSolution } from "../../common/utils-sudoku"

export class IsSudokuSolvedUseCase {

  private sudokuStateRepository: SudokuStateRepository

  constructor(sudokuStateRepository: SudokuStateRepository) {
    this.sudokuStateRepository = sudokuStateRepository
  }

  public perform(): boolean {
    const state = this.sudokuStateRepository.getState()
    return validateSolution(state.solution, state.puzzle)
  }

  public perform$(): Observable<boolean> {
    return this.sudokuStateRepository
      .getState$()
      .pipe(
        map(state => {
          return validateSolution(state.solution, state.puzzle)
        }),
        distinctUntilChanged()
      )
  }
}

export const isSudokuSolvedUseCase: IsSudokuSolvedUseCase = 
  new IsSudokuSolvedUseCase(sudokuStateRepository)
