import { GRID_NUM_CELLS, GRID_CELL_INDEX_MAX, GRID_CELL_INDEX_MIN, CELL_NO_VALUE } from "../core/common/global-constants"
import { clearIntersectingNotesOnInput } from "../core/common/utils-sudoku"
import { isLockedCell } from "../core/common/utils-sudoku"

export function updateSudokuState(prevState: SudokuState, index: number, value: string, isNote: boolean): SudokuState {
  if (
    index < GRID_CELL_INDEX_MIN || 
    index > GRID_CELL_INDEX_MAX || 
    isLockedCell(index, prevState.originalPuzzle)
  ) {
    return prevState
  }

  if (isNote && prevState.puzzle[index] == CELL_NO_VALUE) {
    const newNotes = [...prevState.notes]
    const cellNotes: string = newNotes[index]
    if (cellNotes.includes(value)) {
      newNotes[index] = cellNotes.replace(value, "")
    } else {
      newNotes[index] += value
    }

    return new SudokuState(
      prevState.originalPuzzle,
      prevState.puzzle,
      prevState.solution,
      prevState.difficulty,
      newNotes,
    )
  }

  const newNotes = clearIntersectingNotesOnInput(index, value, prevState.notes)
  newNotes[index] = ""

  const newPuzzle = prevState.puzzle.substring(0, index) + value + prevState.puzzle.substring(index + 1)

  return new SudokuState(
    prevState.originalPuzzle,
    newPuzzle,
    prevState.solution,
    prevState.difficulty,
    newNotes,
  )
}

export class SudokuState {
  readonly originalPuzzle: string
  readonly puzzle: string
  readonly solution: string
  readonly difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  readonly notes: Array<string>

  constructor(
    originalPuzzle: string,
    puzzle: string,
    solution: string,
    difficulty: 'easy' | 'medium' | 'hard' | 'expert',
    notes: Array<string> = Array(GRID_NUM_CELLS).fill(""),
  ) {
    this.originalPuzzle = originalPuzzle
    this.puzzle = puzzle
    this.solution = solution
    this.difficulty = difficulty
    this.notes = notes
  }
}