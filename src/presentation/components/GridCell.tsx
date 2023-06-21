import styles from "./GridCell.module.css"
import { CELL_NO_SELECTION_INDEX, CELL_NO_VALUE } from '../../core/common/global-constants'


export interface GridCellProps {
  index: number
  cellValue: string
  highlightedCellValue: string
  selectedCellIndex: number
  isLockedCell: boolean
  notes: string,
  isSolved: boolean,
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
  const transitionDuration = Math.round(Math.random() * 500) + "ms"

  return (
    <div
      key={index}
      className={gridCellStyle}
      style={{transitionDelay: transitionDuration, transitionDuration: transitionDuration}}
      onClick={() => updateSelectedCellIndex(selectedCellIndex, index)}
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