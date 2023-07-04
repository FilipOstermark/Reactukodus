import styles from "./GridCell.module.css"
import { EMPTY_CELL_VALUE } from '../../../common/global-constants'
import { useEffect, useRef, useState } from "react"
import { getPopinAnimationDelay } from "../../utils-presentation"


export interface GridCellProps {
  index: number
  cellValue: string
  isHighlighted: boolean
  isSelectedCell: boolean
  isLockedCell: boolean
  notes: string
  isSolved: boolean
  triggerPopinAnimation: number
  onClick: () => void
}

const GridCell = (
  {
    index,
    cellValue, 
    isHighlighted, 
    isLockedCell,
    notes,
    isSolved,
    triggerPopinAnimation,
    onClick
  }: GridCellProps
) => {
  const displayValue: string = cellValue === EMPTY_CELL_VALUE ? "" : cellValue
  
  const highlightStyle = isHighlighted ? styles["highlight-showing"] : styles["highlight-hidden"]
  const defaultNumberStyle = isLockedCell ? styles.locked : styles.open
  const gridCellStyle = isSolved ? styles["sudoku-grid-cell-solved"] : styles["sudoku-grid-cell"]
  const notesDisplay = notes.split('').sort().join('')

  const [popin, setPopin] = useState(false)
  const transitionDuration = useRef<string>(getPopinAnimationDelay())

  console.debug("Render cell with index:", index)

  useEffect(() => {
    setPopin(true)
  }, [triggerPopinAnimation])

  return (
    <div
      key={index}
      className={gridCellStyle}
      style={{animationDelay: transitionDuration.current, animationDuration: transitionDuration.current}}
      onClick={onClick}
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