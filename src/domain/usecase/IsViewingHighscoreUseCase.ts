import { Observable } from "rxjs"
import { GameControlRepository, gameControlRepository } from "../../data/GameControlRepository"

class IsViewingHighscoreUseCase {

  private gameControlRepository: GameControlRepository

  constructor(gameControlRepository: GameControlRepository) {
    this.gameControlRepository = gameControlRepository
  }

  public perform(): boolean {
    return this.gameControlRepository.isViewingHighscore()
  }

  public perform$(): Observable<boolean> {
    return this.gameControlRepository.isViewingHighscore$()
  }
}

export const isViewingHighscoreUseCase: IsViewingHighscoreUseCase = 
  new IsViewingHighscoreUseCase(gameControlRepository)
