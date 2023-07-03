import { GameControlRepository, gameControlRepository } from "../../data/GameControlRepository"

export class SetNotesModeUseCase {

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
