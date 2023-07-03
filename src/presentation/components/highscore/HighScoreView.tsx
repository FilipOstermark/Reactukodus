import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { Highscore } from "../../../domain/model/Highscore"
import { HighscoreEntry } from "../../../domain/model/HighscoreEntry"

interface HighscoreViewProps {
  highscore: Highscore,
  difficulty: Difficulty,
  isViewingHighscore: boolean
}

export const HighscoreView = (
  { 
    highscore, 
    difficulty, 
    isViewingHighscore
  }: HighscoreViewProps
) => {
  const epochTimes = highscore[difficulty].map(entry => {
    return entry.epochTimeMillis
  })
  const mostRecentEpochTime = Math.max(...epochTimes)

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
    >
      <h1>Highscore</h1>
      <h2>({difficulty})</h2>
      {scoreList}
    </div>
  )
}