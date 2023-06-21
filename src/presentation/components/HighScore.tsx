import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { Highscore } from "../../data/HighscoreRepository"

interface HighscoreViewProps {
  highscore: Highscore,
  difficulty: Difficulty,
  isSolved: boolean
}

export const HighscoreView = (
  { 
    highscore, 
    difficulty, 
    isSolved 
  }: HighscoreViewProps
) => {
  const style = isSolved ? 'highscore-showing' : 'highscore'
  const scoreList = highscore[difficulty].map(
    (value: string, index: number) => {
      return (<p key={index}><b>{index + 1}.</b> {value}</p>)
    }
  )

  return (
    <div className={style}>
      <h1>Highscore</h1>
      <h2>({difficulty})</h2>
      {scoreList}
    </div>
  )
}