import { ReactNode } from "react"
import GridLineEmphasis from "./GridLineEmphasis"


export interface GridProps {
  gridCells: Array<ReactNode>,
  isSolved: boolean
}

const Grid = (
  { gridCells, isSolved }: GridProps
) => {
  return (
    <>
      <h1>Solved</h1>
      <div className='sudoku-grid'>{gridCells}</div>
      <GridLineEmphasis isSolved={isSolved} />
    </>
  )
}

export default Grid