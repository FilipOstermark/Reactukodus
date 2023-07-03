import { Observable } from "rxjs"
import { GameControlRepository, gameControlRepository } from "../../data/GameControlRepository"

export class IsNotesModeUseCase {

  private gameControlRepository: GameControlRepository

  constructor(gameControlRepository: GameControlRepository) {
    this.gameControlRepository = gameControlRepository
  }

  public perform(): boolean {
    return this.gameControlRepository.isNotesMode()
  }

  public perform$(): Observable<boolean> {
    return this.gameControlRepository.isNotesMode$()
  }
}

export const isNotesModeUseCase: IsNotesModeUseCase = 
  new IsNotesModeUseCase(gameControlRepository)
