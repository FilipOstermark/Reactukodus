import { ReactNode } from "react"
import GridLineEmphasis from "./GridLineEmphasis"
import { SudokuState } from "../../../domain/model/SudokuState"
import GridCell from "./GridCell"
import { EMPTY_CELL_VALUE } from "../../../common/global-constants"
import { isLockedCell } from "../../../common/utils-sudoku"


export interface GridProps {
  isSolved: boolean
  sudokuState: SudokuState
  highlightedCellValue: string
  selectedCellIndex: number,
  startAnimationTrigger: number,
  updateSelectedCellIndex: (selectedCellIndex: number, index: number) => void
}

const Grid = ({ 
  isSolved, 
  sudokuState,
  highlightedCellValue,
  selectedCellIndex,
  startAnimationTrigger,
  updateSelectedCellIndex
}: GridProps) => {

  const gridCells: Array<ReactNode> = sudokuState.puzzle.split('').map(
    (value: string, index: number) => {
      const notes = sudokuState.notes[index]
      const isHighlightedValue: boolean = highlightedCellValue != EMPTY_CELL_VALUE && (value == highlightedCellValue)
      const isHighlightedNote: boolean = highlightedCellValue != EMPTY_CELL_VALUE && (notes.includes(highlightedCellValue))
      const isSelected = selectedCellIndex === index
      const isHighlighted = isHighlightedValue || isHighlightedNote || isSelected

      return GridCell(
        {
          index: index,
          cellValue: value,
          isHighlighted: isHighlighted,
          isSelectedCell: selectedCellIndex === index,
          isLockedCell: isLockedCell(index, sudokuState.originalPuzzle),
          notes: sudokuState.notes[index],
          isSolved: isSolved,
          triggerPopinAnimation: startAnimationTrigger,
          onClick: () => { updateSelectedCellIndex(selectedCellIndex, index) }
        }
      )
    }
  )

  return (
    <>
      <h1>Solved</h1>
      <div className='sudoku-grid'>{gridCells}</div>
      <GridLineEmphasis isSolved={isSolved} />
    </>
  )
}

export default Grid