import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { SudokuState } from "../domain/entity/SudokuState"
import { GRID_NUM_CELLS, GRID_SIZE, GRID_CELL_INDEX_MIN, GRID_CELL_INDEX_MAX, EMPTY_CELL_VALUE, ALLOWED_CELL_VALUES, NO_CELL_SELECTED_INDEX } from "./global-constants"
import { range } from "./utils-common"
import { getSudoku } from "sudoku-gen"

export function isLockedCell(index: number, originalPuzzle: string): boolean {
  if (index < GRID_CELL_INDEX_MIN || index > GRID_CELL_INDEX_MAX) {
    return true
  }

  return originalPuzzle[index] != EMPTY_CELL_VALUE
}

function getRow(index: number): number {
  return Math.floor(index / 9)
}

function getColumn(index: number): number {
  return index % 9
}

function getBoxIndices(index: number): Array<number> {
  const rowIndex = getRow(index)
  const columnIndex = getColumn(index)
  const boxStartIndex = index - (columnIndex % 3) - 9 * (rowIndex % 3)

  return [
    boxStartIndex, boxStartIndex + 1, boxStartIndex + 2,
    boxStartIndex + 9, boxStartIndex + 10, boxStartIndex + 11,
    boxStartIndex + 18, boxStartIndex + 19, boxStartIndex + 20
  ]
}

function getRowIndices(index: number): Array<number> {
  const row = getRow(index)
  const rowStartIndex = GRID_SIZE*row
  const rowEndIndex = rowStartIndex + GRID_SIZE

  return [...range(rowStartIndex, rowEndIndex)]
}

function getColumnIndices(index: number): Array<number> {
  const column = getColumn(index)
  return [...range(column, GRID_NUM_CELLS, GRID_SIZE)]
}

function getIntersectingNotesIndicesRow(
  index: number, 
  value: string, 
  notes: Array<string>
): Array<number> {
  return getRowIndices(index)
    .filter((index: number) => {
      return notes[index].includes(value)
    })
}

function getIntersectingNotesIndicesColumn(
  index: number,
  value: string,
  notes: Array<string>
): Array<number> {
  return getColumnIndices(index)
    .filter((index: number) => {
      return notes[index].includes(value)
    })
}

function getIntersectingNotesIndicesBox(
  index: number,
  value: string,
  notes: Array<string>
): Array<number> {
  return getBoxIndices(index)
    .filter((index: number) => {
      return notes[index].includes(value)
    })
}

function getIntersectingIndices(
  index: number, 
  value: string, 
  notes: Array<string>
): Array<number> {
  return [
    ...new Set([
      ...getIntersectingNotesIndicesRow(index, value, notes),
      ...getIntersectingNotesIndicesColumn(index, value, notes),
      ...getIntersectingNotesIndicesBox(index, value, notes),
    ])
  ]
}

export function clearIntersectingNotesOnInput(
  index: number,
  value: string,
  notes: Array<string>
): Array<string> {
  const notesCopy = [...notes]
  getIntersectingIndices(index, value, notes).forEach(
    (intersectingIndex: number) => {
      const indexNotes = notesCopy[intersectingIndex]
      notesCopy[intersectingIndex] = indexNotes.replace(value, "")
    })

  return notesCopy
}

export function validateSolution(expected: string, actual: string): boolean {
  return expected === actual
}

export function wrapCellIndex(index: number): number {
  if (index < GRID_CELL_INDEX_MIN) return index + GRID_NUM_CELLS
  else if (index > GRID_CELL_INDEX_MAX) return index - GRID_NUM_CELLS
  
  return index
}

export function isHighlightValueChange(selectedCellIndex: number, key: string): boolean {
  const isNumeric = ALLOWED_CELL_VALUES.includes(key)
  return selectedCellIndex === NO_CELL_SELECTED_INDEX && isNumeric
}

export function isAnyCellSelected(selectedCellIndex: number): boolean {
  return selectedCellIndex !== NO_CELL_SELECTED_INDEX
}

export function createDefaultSudokuState(
  difficulty: Difficulty = 'easy'
): SudokuState {
  const sudoku = getSudoku(difficulty)
  return new SudokuState(
    sudoku.puzzle,
    sudoku.puzzle,
    sudoku.solution,
    sudoku.difficulty
  )
}