import styles from "./GridCell.module.css"
import { NO_CELL_SELECTED_INDEX, EMPTY_CELL_VALUE } from '../../../common/global-constants'
import { useEffect, useRef, useState } from "react"
import { getPopinAnimationDelay } from "../../utils-presentation"


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
  const displayValue: string = cellValue === EMPTY_CELL_VALUE ? "" : cellValue
  const isSelectedCell: boolean = selectedCellIndex == index
  const isHighlightedValue: boolean = highlightedCellValue != EMPTY_CELL_VALUE && (cellValue == highlightedCellValue)
  const isHighlightedNote: boolean = highlightedCellValue != EMPTY_CELL_VALUE && (notes.includes(highlightedCellValue))
  const isHighlightShowing: boolean = isSelectedCell || isHighlightedValue || isHighlightedNote
  const highlightStyle = isHighlightShowing ? styles["highlight-showing"] : styles["highlight-hidden"]
  const defaultNumberStyle = isLockedCell ? styles.locked : styles.open
  const gridCellStyle = isSolved ? styles["sudoku-grid-cell-solved"] : styles["sudoku-grid-cell"]
  const notesDisplay = notes.split('').sort().join('')

  const [popin, setPopin] = useState(false)
  const transitionDuration = useRef<string>(getPopinAnimationDelay())

  useEffect(() => {
    setPopin(true)
  }, [triggerPopinAnimation])

  function updateSelectedCellIndex(currentIndex: number, clickedIndex: number) {
    const newIndex = currentIndex === clickedIndex ? NO_CELL_SELECTED_INDEX : clickedIndex
    if (highlightedCellValue == EMPTY_CELL_VALUE) {
      setSelectedCellIndex(newIndex)
    } else {
      handleValueInput(clickedIndex, highlightedCellValue)
    }
  }

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
      <div className={`${highlightStyle}`} />
      <p className={defaultNumberStyle}>
        {displayValue}
      </p>
      <p className={styles.notes}>{notesDisplay}</p>
    </div>
  )
}

export default GridCell