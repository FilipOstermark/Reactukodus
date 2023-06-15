import styles from "./GridCell.module.css"
import { CELL_NO_SELECTION_INDEX, CELL_NO_VALUE } from '../../core/common/global-constants'


export interface GridCellProps {
  index: number
  cellValue: string
  highlightedCellValue: string
  selectedCellIndex: number
  isLockedCell: boolean
  notes: string
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

  const highlightStyleClassName = isHighlightShowing ? styles.highlight_showing : styles.highlight_hidden

  const defaultNumberStyle = isLockedCell ? styles.locked : styles.open
  const highlightNumberStyle = isHighlightShowing ? styles.highlighted : ""
  const combinedNumberStyle = [defaultNumberStyle, highlightNumberStyle].join(" ")
  return (
    <div
      key={index}
      className='sudoku-grid-cell'
      onClick={() => updateSelectedCellIndex(selectedCellIndex, index)}
    >
      <div className='sudoku-grid-cell-inset-border'></div>
      <div className={`${styles.highlight} ${highlightStyleClassName}`} />
      <p className={combinedNumberStyle}>
        {displayValue}
      </p>
      <p className={styles.notes}>{notesDisplay}</p>
    </div>
  )
}

export default GridCell