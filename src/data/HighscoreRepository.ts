import { Highscore } from "../domain/model/Highscore"
import { HighscoreDataSource } from "./HighscoreDataSource"
import { highscoreLocalStorageDataSource } from "./HighscoreLocalStorageDataSource"
import { Observable } from "rxjs"

export interface HighScoreRepository {
  getHighscore$: () => Observable<Highscore>
  getHighscore: () => Highscore
  setHighscore: (newHighscore: Highscore) => void
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
}

const highscoreRepository: HighScoreRepository = new HighScoreRepositoryImpl(
  highscoreLocalStorageDataSource
)

export default highscoreRepository