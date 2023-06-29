import { GRID_NUM_CELLS } from "../../common/global-constants"

export class SudokuState {
  readonly originalPuzzle: string
  readonly puzzle: string
  readonly solution: string
  readonly difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  readonly notes: Array<string>
  readonly previousState: SudokuState | undefined

  constructor(
    originalPuzzle: string,
    puzzle: string,
    solution: string,
    difficulty: 'easy' | 'medium' | 'hard' | 'expert',
    notes: Array<string> = Array(GRID_NUM_CELLS).fill(""),
    previousState: SudokuState | undefined = undefined
  ) {
    this.originalPuzzle = originalPuzzle
    this.puzzle = puzzle
    this.solution = solution
    this.difficulty = difficulty
    this.notes = notes
    this.previousState = previousState
  }
}