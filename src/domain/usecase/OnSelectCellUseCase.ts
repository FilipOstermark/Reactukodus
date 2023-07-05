import { EMPTY_CELL_VALUE, NO_CELL_SELECTED_INDEX } from "../../common/global-constants"
import { GameControlRepository, gameControlRepository } from "../../data/GameControlRepository"
import { BaseUseCase } from "./BaseUseCase"
import { UpdateSudokuStateUseCase, updateSudokuStateUseCase } from "./UpdateSudokuStateUseCase"

export class OnSelectCellUseCase implements BaseUseCase {

  private gameControlRepository: GameControlRepository
  private updateSudokuStateUseCase: UpdateSudokuStateUseCase

  constructor(
    gameControlRepository: GameControlRepository, 
    updateSudokuStateUseCase: UpdateSudokuStateUseCase
  ) {
    this.gameControlRepository = gameControlRepository
    this.updateSudokuStateUseCase = updateSudokuStateUseCase
  }

  public perform:(selectedIndex: number) => void = selectedIndex => {
    const highlightedCellValue = 
      this.gameControlRepository.highlightedCellValue()
    const isHighlightedValueMode = highlightedCellValue != EMPTY_CELL_VALUE

    if (isHighlightedValueMode) {
      this.updateSudokuStateUseCase.perform(
        selectedIndex,
        highlightedCellValue
      )

      return
    }

    const prevIndex = this.gameControlRepository.selectedCellIndex()
    const newIndexOrUnselect =
      (prevIndex === selectedIndex) ? NO_CELL_SELECTED_INDEX : selectedIndex
    this.gameControlRepository.setSelectedCellIndex(newIndexOrUnselect)
  }
}

export const onSelectCellUseCase: OnSelectCellUseCase = 
  new OnSelectCellUseCase(
    gameControlRepository,
    updateSudokuStateUseCase
  )
