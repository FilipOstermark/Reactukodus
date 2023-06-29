import { Highscore } from "../domain/model/Highscore"
import { Observable } from "rxjs"

export interface HighscoreDataSource {
  getHighscore$: () => Observable<Highscore>
  getHighscore: () => Highscore
  setHighscore: (newHighscore: Highscore) => void
}