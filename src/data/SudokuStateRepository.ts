import { createDefaultSudokuState } from "../common/utils-sudoku"
import { SudokuState } from "../domain/model/SudokuState"
import { BehaviorSubject, Observable } from "rxjs"

export interface SudokuStateRepository {
  getState$: () => Observable<SudokuState>
  getState: () => SudokuState
  setState: (state: SudokuState) => void
}

class SudokuStateRepositoryImpl implements SudokuStateRepository {
  private state$: BehaviorSubject<SudokuState>

  constructor() {
    this.state$ = new BehaviorSubject(
      createDefaultSudokuState()
    )
  }

  getState$: () => Observable<SudokuState> = () => {
    return this.state$.asObservable()
  }

  getState: () => SudokuState = () => {
    return this.state$.getValue()
  }

  setState: (state: SudokuState) => void = state => {
    this.state$.next(state)
  }
}

export const sudokuStateRepository: SudokuStateRepository = 
  new SudokuStateRepositoryImpl()
