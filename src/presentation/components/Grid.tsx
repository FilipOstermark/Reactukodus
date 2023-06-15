import { ReactNode } from "react"
import GridLineEmphasis from "./GridLineEmphasis"


export interface GridProps {
  puzzle: string
  highlightedCellValue: string
  selectedCellIndex: number
  isLockedCell: (index: number) => boolean
  handleValueInput: (index: number, value: string) => void
  setSelectedCellIndex: (idx: number) => void,
  gridCells: Array<ReactNode>
}

const Grid = (
  { gridCells }: GridProps
) => {
  return (
    <div className='sudoku-grid-wrapper'>
      <h1>Solved</h1>
      <div className='sudoku-grid'>{gridCells}</div>
      <GridLineEmphasis />
    </div>
  )
}

export default Grid