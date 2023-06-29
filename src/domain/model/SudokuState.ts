import { GRID_NUM_CELLS, GRID_CELL_INDEX_MAX, GRID_CELL_INDEX_MIN, EMPTY_CELL_VALUE } from "../../common/global-constants"
import { isStrictEqualArray } from "../../common/utils-common"
import { clearIntersectingNotesOnInput } from "../../common/utils-sudoku"
import { isLockedCell } from "../../common/utils-sudoku"

export function updateSudokuState(
  currentState: SudokuState, 
  index: number, 
  value: string, 
  isNote: boolean
): SudokuState {
  if (
    index < GRID_CELL_INDEX_MIN || 
    index > GRID_CELL_INDEX_MAX || 
    isLockedCell(index, currentState.originalPuzzle)
  ) {
    return currentState
  }

  if (isNote && currentState.puzzle[index] == EMPTY_CELL_VALUE) {
    const newNotes = [...currentState.notes]
    const cellNotes: string = newNotes[index]
    if (cellNotes.includes(value)) {
      newNotes[index] = cellNotes.replace(value, "")
    } else {
      newNotes[index] += value
    }

    if (isStrictEqualArray(currentState.notes, newNotes)) {
      console.log("Same state, not updating (1)")
      return currentState
    }

    return new SudokuState(
      currentState.originalPuzzle,
      currentState.puzzle,
      currentState.solution,
      currentState.difficulty,
      newNotes,
      currentState
    )
  }

  const newNotes = clearIntersectingNotesOnInput(
    index, 
    value, 
    currentState.notes
  )
  newNotes[index] = ""

  const newPuzzle = currentState.puzzle.substring(0, index) 
    + value 
    + currentState.puzzle.substring(index + 1)

  if (currentState.puzzle === newPuzzle) {
    console.log("Same state, not updating (2)")
    return currentState
  }

  return new SudokuState(
    currentState.originalPuzzle,
    newPuzzle,
    currentState.solution,
    currentState.difficulty,
    newNotes,
    currentState
  )
}

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