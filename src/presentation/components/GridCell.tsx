import styles from "./GridCell.module.css"
import { CELL_NO_SELECTION_INDEX, CELL_NO_VALUE } from '../../core/common/global-constants'
import { useEffect, useRef, useState } from "react"


export interface GridCellProps {
  index: number
  cellValue: string
  highlightedCellValue: string
  selectedCellIndex: number
  isLockedCell: boolean
  notes: string,
  isSolved: boolean,
  triggerPopinAnimation: number,
  handleValueInput: (index: number, value: string) => void
  setSelectedCellIndex: (idx: number) => void
}

const GridCell = (
  {
    index,
    cellValue, 
    highlightedCellValue, 
    selectedCellIndex,
    isLockedCell,
    notes,
    isSolved,
    triggerPopinAnimation,
    handleValueInput,
    setSelectedCellIndex
  }: GridCellProps
) => {
  const displayValue: string = cellValue === CELL_NO_VALUE ? "" : cellValue
  const isSelectedCell: boolean = selectedCellIndex == index
  const isHighlightedValue: boolean = highlightedCellValue != CELL_NO_VALUE && (cellValue == highlightedCellValue)
  const isHighlightedNote: boolean = highlightedCellValue != CELL_NO_VALUE && (notes.includes(highlightedCellValue))
  const isHighlightShowing: boolean = isSelectedCell || isHighlightedValue || isHighlightedNote
  const notesDisplay = notes.split('').sort().join('')

  const [popin, setPopin] = useState(false)

  const transitionDuration = useRef<string>(Math.round(200 + Math.random() * 500) + "ms")

  useEffect(() => {
    setPopin(true)
  }, [triggerPopinAnimation])

  function updateSelectedCellIndex(currentIndex: number, clickedIndex: number) {
    const newIndex = currentIndex === clickedIndex ? CELL_NO_SELECTION_INDEX : clickedIndex
    if (highlightedCellValue == CELL_NO_VALUE) {
      setSelectedCellIndex(newIndex)
    } else {
      handleValueInput(clickedIndex, highlightedCellValue)
    }
  }

  const highlightStyleClassName = isHighlightShowing ? styles["highlight-showing"] : styles["highlight-hidden"]
  const defaultNumberStyle = isLockedCell ? styles.locked : styles.open
  const gridCellStyle = isSolved ? styles["sudoku-grid-cell-solved"] : styles["sudoku-grid-cell"]

  return (
    <div
      key={index}
      className={gridCellStyle}
      style={{animationDelay: transitionDuration.current, animationDuration: transitionDuration.current}}
      onClick={() => updateSelectedCellIndex(selectedCellIndex, index)}
      onAnimationEnd={() => { setPopin(false) }}
      data-popin={popin}
    >
      <div className='sudoku-grid-cell-inset-border'></div>
      <div className={`${highlightStyleClassName}`} />
      <p className={defaultNumberStyle}>
        {displayValue}
      </p>
      <p className={styles.notes}>{notesDisplay}</p>
    </div>
  )
}

export default GridCell