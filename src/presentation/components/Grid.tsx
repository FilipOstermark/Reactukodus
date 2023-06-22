import { ReactNode } from "react"
import GridLineEmphasis from "./GridLineEmphasis"


export interface GridProps {
  gridCells: Array<ReactNode>,
  highscoreView: ReactNode,
  isSolved: boolean
}

const Grid = (
  { gridCells, highscoreView, isSolved }: GridProps
) => {
  return (
    <div className='sudoku-grid-wrapper'>
      <h1>Solved</h1>
      <div className='sudoku-grid'>{gridCells}</div>
      <GridLineEmphasis isSolved={isSolved} />
      {highscoreView}
    </div>
  )
}

export default Grid