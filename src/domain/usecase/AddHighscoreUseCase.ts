import highscoreRepository, { HighScoreRepository } from "../../data/HighscoreRepository"
import { Highscore } from "../model/Highscore"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { updateHighscore } from "../model/Highscore"
import { BaseUseCase } from "./BaseUseCase"

export class AddHighscoreUseCase implements BaseUseCase {
  private highscoreRepository: HighScoreRepository

  constructor(highscoreRepository: HighScoreRepository) {
    this.highscoreRepository = highscoreRepository
  }

  public perform(score: string, difficulty: Difficulty): void {
    const currHighscore: Highscore = this.highscoreRepository.getHighscore()
    const newHighscore = updateHighscore(currHighscore, difficulty, score)
    this.highscoreRepository.setHighscore(newHighscore)
  }
}

export const addHighscoreUseCase: AddHighscoreUseCase = 
  new AddHighscoreUseCase(highscoreRepository)
