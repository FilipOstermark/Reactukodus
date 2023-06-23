import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { Highscore } from "../../domain/Highscore"
import { HighscoreEntry } from "../../domain/HighscoreEntry"

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
    <div className="highscore" data-is-solved={isSolved}>
      <h1>Highscore</h1>
      <h2>({difficulty})</h2>
      {scoreList}
    </div>
  )
}