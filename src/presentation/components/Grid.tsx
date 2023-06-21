import { ReactNode } from "react"
import GridLineEmphasis from "./GridLineEmphasis"


export interface GridProps {
  gridCells: Array<ReactNode>,
  highscoreView: ReactNode
}

const Grid = (
  { gridCells, highscoreView }: GridProps
) => {
  return (
    <div className='sudoku-grid-wrapper'>
      <h1>Solved</h1>
      <div className='sudoku-grid'>{gridCells}</div>
      <GridLineEmphasis />
      {highscoreView}
    </div>
  )
}

export default Grid