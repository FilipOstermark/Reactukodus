import { HighscoreDataSource } from "./HighscoreDataSource"
import { Highscore, defaultHighscore, isHighscore } from "../domain/model/Highscore"
import { BehaviorSubject, Observable } from "rxjs"

const KEY_HIGHSCORE = "highscore"

export class HighscoreLocalStorageDataSource implements HighscoreDataSource {

  // TODO Separate data source?
  private cache$: BehaviorSubject<Highscore>

  constructor() {
    this.cache$ = new BehaviorSubject(this.getHighscore())
  }

  getHighscore$: () => Observable<Highscore> = () => {
    return this.cache$.asObservable()
  }

  getHighscore: () => Highscore = () => {
    // TODO Lift error handling
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
    this.cache$.next(this.getHighscore())
  }
}

export const highscoreLocalStorageDataSource: HighscoreLocalStorageDataSource = 
  new HighscoreLocalStorageDataSource()
