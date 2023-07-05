import { ReactNode } from "react"
import GridLineEmphasis from "./GridLineEmphasis"
import GridCell from "./GridCell"
import { EMPTY_CELL_VALUE } from "../../../common/global-constants"
import { isLockedCell } from "../../../common/utils-sudoku"
import { useSubscribe } from "../../hooks/usesubscribe"
import { gameControlRepository } from "../../../data/GameControlRepository"
import { sudokuStateRepository } from "../../../data/SudokuStateRepository"
import { onSelectCellUseCase } from "../../../domain/usecase/gamecontrol/OnSelectCellUseCase"


export interface GridProps {
  startAnimationTrigger: number
}

const Grid = ({ startAnimationTrigger }: GridProps) => {

  const selectedCellIndex = useSubscribe(
    gameControlRepository.selectedCellIndex$(),
    gameControlRepository.selectedCellIndex()
  )
  const highlightedCellValue = useSubscribe(
    gameControlRepository.highlightedCellValue$(),
    gameControlRepository.highlightedCellValue()
  )
  const sudokuState = useSubscribe(
    sudokuStateRepository.getState$(),
    sudokuStateRepository.getState()
  )
  const isViewingHighscore = useSubscribe(
    gameControlRepository.isViewingHighscore$(),
    gameControlRepository.isViewingHighscore()
  )

  // TODO Ensure only updated gridcells re-render
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
          isSolved: isViewingHighscore,
          triggerPopinAnimation: startAnimationTrigger,
          onClick: () => { onSelectCellUseCase.perform(index) }
        }
      )
    }
  )

  return (
    <>
      <h1>Solved</h1>
      <div className='sudoku-grid'>{gridCells}</div>
      <GridLineEmphasis isSolved={isViewingHighscore} />
    </>
  )
}

export default Grid