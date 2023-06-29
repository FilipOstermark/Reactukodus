import { EMPTY_CELL_VALUE, GRID_CELL_INDEX_MAX, GRID_CELL_INDEX_MIN } from "../../common/global-constants"
import { isStrictEqualArray } from "../../common/utils-common"
import { clearIntersectingNotesOnInput, isLockedCell } from "../../common/utils-sudoku"
import { SudokuStateRepository, sudokuStateRepository } from "../../data/SudokuStateRepository"
import { SudokuState } from "../model/SudokuState"

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

function updateSudokuState(
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

export const updateSudokuStateUseCase: UpdateSudokuStateUseCase = 
  new UpdateSudokuStateUseCase(sudokuStateRepository)
