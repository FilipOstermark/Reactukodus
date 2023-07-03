import { GameControlRepository, gameControlRepository } from "../../data/GameControlRepository"

class ToggleViewingHighscoreUseCase {

  private gameControlRepository: GameControlRepository

  constructor(gameControlRepository: GameControlRepository) {
    this.gameControlRepository = gameControlRepository
  }

  public perform(): void {
    const prev = this.gameControlRepository.isViewingHighscore()
    this.gameControlRepository.setViewingHighscore(!prev)
  }
}

export const toggleViewingHighscoreUseCase: ToggleViewingHighscoreUseCase = 
  new ToggleViewingHighscoreUseCase(gameControlRepository)
