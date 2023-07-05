import { GameControlRepository, gameControlRepository } from "../../data/GameControlRepository"
import { BaseUseCase } from "./BaseUseCase"

class ToggleViewingHighscoreUseCase implements BaseUseCase {

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
