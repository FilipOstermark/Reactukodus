import React from 'react'
import styles from "./GridCell.module.css"
import { CELL_NO_SELECTION_INDEX, CELL_NO_VALUE, GRID_SIZE } from '../global-constants'


export interface GridCellProps {
  index: number
  cellValue: string
  highlightedCellValue: string
  selectedCellIndex: number
  isLockedCell: boolean
  handleValueInput: (index: number, value: string) => void
  setSelectedCellIndex: (idx: number) => void
}

const GridCell: React.FC<GridCellProps> = (
  {
    index, 
    cellValue, 
    highlightedCellValue, 
    selectedCellIndex,
    isLockedCell,
    handleValueInput,
    setSelectedCellIndex
  }: GridCellProps
) => {
  const indexX: number = index % GRID_SIZE
  const indexY: number = Math.floor(index / GRID_SIZE)
  const displayValue: string = cellValue === CELL_NO_VALUE ? "" : cellValue
  const isSelectedCell: boolean = selectedCellIndex == index
  const isHighlightedValue: boolean = highlightedCellValue != CELL_NO_VALUE && (cellValue == highlightedCellValue)
  const isHighlightShowing: boolean = isSelectedCell || isHighlightedValue

  function updateSelectedCellIndex(currentIndex: number, clickedIndex: number) {
    const newIndex = currentIndex === clickedIndex ? CELL_NO_SELECTION_INDEX : clickedIndex
    if (highlightedCellValue == CELL_NO_VALUE) {
      setSelectedCellIndex(newIndex)
    } else {
      handleValueInput(clickedIndex, highlightedCellValue)
    }
  }

  const numberStyleClassName = isLockedCell ? styles.locked : styles.open
  const highlightStyleClassName = isHighlightShowing ? styles.highlight_showing : styles.highlight_hidden
  return (
    <div
      key={index}
      className='sudoku-grid-cell'
      data-x={indexX}
      data-y={indexY}
      onClick={() => updateSelectedCellIndex(selectedCellIndex, index)}
    >
      <div className='sudoku-grid-cell-inset-border'></div>
      <div className={`${styles.highlight} ${highlightStyleClassName}`} />
      <p className={numberStyleClassName}>
        {displayValue}
      </p>
      <p className={styles.notes}></p>
    </div>
  )
}

export default GridCell