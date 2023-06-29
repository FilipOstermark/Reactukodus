import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { Highscore, updateHighscore } from "../domain/model/Highscore"
import { HighscoreDataSource } from "./HighscoreDataSource"
import { highscoreLocalStorageDataSource } from "./HighscoreLocalStorageDataSource"
import { Observable } from "rxjs"

export interface HighScoreRepository {
  getHighscore$: () => Observable<Highscore>
  getHighscore: () => Highscore
  setHighscore: (newHighscore: Highscore) => void
  addScore: (score: string, difficulty: Difficulty) => void
}

class HighScoreRepositoryImpl implements HighScoreRepository {

  private dataSource: HighscoreDataSource

  constructor(dataSource: HighscoreDataSource) {
    this.dataSource = dataSource
  }

  getHighscore$: () => Observable<Highscore> = () => {
    return this.dataSource.getHighscore$()
  }
  
  getHighscore: () => Highscore = () => {
    return this.dataSource.getHighscore()
  }

  setHighscore: (newHighscore: Highscore) => void = newHighscore => {
    this.dataSource.setHighscore(newHighscore)
  }

  // TODO Use case
  addScore: (score: string, difficulty: Difficulty) => void = (
    score: string, 
    difficulty: Difficulty
  ) => {
    const highscore: Highscore = this.getHighscore()
    const newHighscore = updateHighscore(highscore, difficulty, score)
    this.setHighscore(newHighscore)
  }
}

const highscoreRepository: HighScoreRepository = new HighScoreRepositoryImpl(
  highscoreLocalStorageDataSource
)

export default highscoreRepository