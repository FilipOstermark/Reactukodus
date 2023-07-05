import { GameControlRepository, gameControlRepository } from "../../data/GameControlRepository"
import { BaseUseCase } from "./BaseUseCase"

export class SetNotesModeUseCase implements BaseUseCase {

  private gameControlRepository: GameControlRepository

  constructor(gameControlRepository: GameControlRepository) {
    this.gameControlRepository = gameControlRepository
  }

  public perform(value: boolean): void {
    this.gameControlRepository.setNotesMode(value)
  }
}

export const setNotesModeUseCase: SetNotesModeUseCase = 
  new SetNotesModeUseCase(gameControlRepository)
