import { IconButton } from "../iconbutton/IconButton"
import NotesIcon from '../../assets/edit-box-icon.svg'
import UndoIcon from '../../assets/undo-icon.svg'
import HighscoreIcon from '../../assets/highscore-icon.svg'
import { undoSudokuStateUseCase } from "../../../domain/usecase/sudoku/UndoSudokuStateUseCase"
import { toggleNotesModeUseCase } from "../../../domain/usecase/gamecontrol/ToggleNotesModeUseCase"
import { isViewingHighscoreUseCase } from "../../../domain/usecase/highscore/IsViewingHighscoreUseCase"
import { useEffect, useState } from "react"
import { isNotesModeUseCase } from "../../../domain/usecase/gamecontrol/IsNotesModeUseCase"
import { toggleViewingHighscoreUseCase } from "../../../domain/usecase/highscore/ToggleViewingHighscoreUseCase"

export const UtilityButtons = () => {

  const [isNotesMode, setIsNotesMode] = useState(
    isNotesModeUseCase.perform()
  )
  const [isViewingHighscore, setIsViewingHighscore] = useState(
    isViewingHighscoreUseCase.perform()
  )

  useEffect(() => {
    const isNotesModeSubscription = isNotesModeUseCase
      .perform$()
      .subscribe(value => {
        setIsNotesMode(value)
      })
    const isViewingHighscoreSubscription = isViewingHighscoreUseCase
      .perform$()
      .subscribe(value => {
        setIsViewingHighscore(value)
      })

    return () => {
      isNotesModeSubscription.unsubscribe()
      isViewingHighscoreSubscription.unsubscribe()
    }
  }, [])

  function handleNotesButtonClick() {
    toggleNotesModeUseCase.perform()
  }

  function handleUndoButtonClick() {
    undoSudokuStateUseCase.perform()
  }

  function handleHighscoreButtonClick() {
    toggleViewingHighscoreUseCase.perform()
  }

  return (
    <div className='utility-buttons'>
      <IconButton
        iconSrc={NotesIcon} 
        onClick={handleNotesButtonClick}
        isFilled={isNotesMode} />
      <IconButton 
        iconSrc={UndoIcon}
        onClick={handleUndoButtonClick}
        isFilled={false} />
      <IconButton 
        iconSrc={HighscoreIcon}
        onClick={handleHighscoreButtonClick}
        isFilled={isViewingHighscore} />
    </div>
  )
}