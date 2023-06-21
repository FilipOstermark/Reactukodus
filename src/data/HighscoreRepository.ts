import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"

export interface Highscore {
  easy: Array<string>
  medium: Array<string>
  hard: Array<string>
  expert: Array<string>
}

const KEY_HIGHSCORE = "highscore"

function defaultHighscore(): Highscore {
  return { 
    easy: [],
    medium: [],
    hard: [],
    expert: []
  }
}

export interface HighScoreRepository {
  getHighscore: () => Highscore
  setHighscore: (newHighscore: Highscore) => void
  addScore: (score: string, difficulty: Difficulty) => void
}

class HighScoreRepositoryImpl implements HighScoreRepository {
  getHighscore: () => Highscore = () => {
    try {
      const obj = JSON.parse(
        localStorage.getItem(KEY_HIGHSCORE) ?? ""
      )

      if (obj satisfies Highscore) {
        return obj
      }

      return defaultHighscore()
    } catch (e) {
      return defaultHighscore()
    }
  }

  setHighscore: (newHighscore: Highscore) => void = newHighscore => {
    localStorage.setItem(KEY_HIGHSCORE, JSON.stringify(newHighscore))
  }

  addScore: (score: string, difficulty: Difficulty) => void = (
    score: string, 
    difficulty: Difficulty
  ) => {
    const highscore: Highscore = this.getHighscore()

    console.log("Highscore: " + highscore)

    highscore[difficulty].push(score)
    highscore[difficulty] = highscore[difficulty].sort().slice(0, 10)

    this.setHighscore(highscore)
  }
}

const highscoreRepository: HighScoreRepository = new HighScoreRepositoryImpl()

export default highscoreRepository