import { GRID_NUM_CELLS, GRID_SIZE, GRID_CELL_INDEX_MIN, GRID_CELL_INDEX_MAX, CELL_NO_VALUE } from "./global-constants"
import { range } from "./utils-common"

export function isLockedCell(index: number, originalPuzzle: string): boolean {
  if (index < GRID_CELL_INDEX_MIN || index > GRID_CELL_INDEX_MAX) {
    return true
  }

  return originalPuzzle[index] != CELL_NO_VALUE
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