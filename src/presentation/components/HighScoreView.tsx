import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { Highscore } from "../../domain/Highscore"
import { HighscoreEntry } from "../../domain/HighscoreEntry"

interface HighscoreViewProps {
  highscore: Highscore,
  difficulty: Difficulty,
  isSolved: boolean,
  isViewingHighscore: boolean
}

export const HighscoreView = (
  { 
    highscore, 
    difficulty, 
    isSolved,
    isViewingHighscore
  }: HighscoreViewProps
) => {
  const epochTimes = highscore[difficulty].map(entry => {
    return entry.epochTimeMillis
  })
  const mostRecentEpochTime = Math.max(...epochTimes)
  const transitionDelay = isSolved ? "1.2s" : "0s"

  const scoreList = highscore[difficulty].map(
    ({ score, epochTimeMillis }: HighscoreEntry, index: number) => {
      const isMostRecentEntry = epochTimeMillis === mostRecentEpochTime
      return (
        <p 
          key={index} 
          className="highscore-entry"
          data-is-most-recent={isMostRecentEntry}
        >
          <b>{index + 1}.</b>{score}
        </p>
      )
    }
  )

  return (
    <div 
      className="highscore" 
      data-is-solved={isViewingHighscore}
      style={{transitionDelay: transitionDelay}}
    >
      <h1>Highscore</h1>
      <h2>({difficulty})</h2>
      {scoreList}
    </div>
  )
}