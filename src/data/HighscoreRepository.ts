import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { Highscore, defaultHighscore, isHighscore, updateHighscore } from "../core/domain/entity/Highscore"
import { KEY_HIGHSCORE } from "../core/common/global-constants"


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

      if (isHighscore(obj)) {
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
    const newHighscore = updateHighscore(highscore, difficulty, score)
    this.setHighscore(newHighscore)
  }
}

const highscoreRepository: HighScoreRepository = new HighScoreRepositoryImpl()

export default highscoreRepository