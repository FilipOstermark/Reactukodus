import { Observable } from "rxjs"
import { GameControlRepository, gameControlRepository } from "../../../data/GameControlRepository"
import { BaseUseCase } from "../BaseUseCase"
import { ObservableUseCase } from "../ObservableUseCase"

export class IsNotesModeUseCase implements BaseUseCase, ObservableUseCase {

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
