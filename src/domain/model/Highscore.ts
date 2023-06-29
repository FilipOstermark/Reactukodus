import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { HighscoreEntry, isHighscoreEntry } from "./HighscoreEntry"

export interface Highscore {
  easy: HighscoreEntry[]
  medium: HighscoreEntry[]
  hard: HighscoreEntry[]
  expert: HighscoreEntry[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isHighscore(obj: any) {
  const difficulties = ['easy', 'medium', 'hard', 'expert']
  try {
    for (let i = 0; i < difficulties.length; ++i) {
      const difficulty = difficulties[i]
      if (obj[difficulty] === undefined) {
        console.debug(`Obj is not highscore, obj[${difficulty}] undefined`)
        return false
      }

      if (!(obj[difficulty] as HighscoreEntry[]).every(isHighscoreEntry)) {
        console.debug(`Obj is not highscore, obj[${difficulty}] wrong shape`)
        return false
      }
    }

    return true
  } catch (e) {
    console.error("Failed to check isHighscore", e)
    return false
  }
}

export function defaultHighscore(): Highscore {
  return { 
    easy: [],
    medium: [],
    hard: [],
    expert: []
  }
}

function sortHighscores(entries: Array<HighscoreEntry>): Array<HighscoreEntry> {
  return [...entries].sort((a: HighscoreEntry, b: HighscoreEntry) => {
    return a.score.localeCompare(b.score)
  })
}

export function updateHighscore(
  currentHighscore: Highscore,
  difficulty: Difficulty,
  newScore: string
): Highscore {
  const highscoreCopy: Highscore = { ...currentHighscore }
  highscoreCopy[difficulty].push(new HighscoreEntry(newScore))
  highscoreCopy[difficulty] = 
    sortHighscores(highscoreCopy[difficulty]).slice(0, 10)

  return highscoreCopy
}
