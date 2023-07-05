import { GameControlRepository, gameControlRepository } from "../../../data/GameControlRepository"
import { BaseUseCase } from "../BaseUseCase"

export class ToggleNotesModeUseCase implements BaseUseCase {

  private gameControlRepository: GameControlRepository

  constructor(gameControlRepository: GameControlRepository) {
    this.gameControlRepository = gameControlRepository
  }

  public perform(): void {
    const prev = this.gameControlRepository.isNotesMode()
    this.gameControlRepository.setNotesMode(!prev)
  }
}

export const toggleNotesModeUseCase: ToggleNotesModeUseCase = 
  new ToggleNotesModeUseCase(gameControlRepository)
