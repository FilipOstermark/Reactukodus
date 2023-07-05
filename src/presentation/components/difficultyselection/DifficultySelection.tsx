import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import styles from "./DifficultySelection.module.css"
import { useSubscribe } from "../../hooks/usesubscribe"
import { sudokuStateRepository } from "../../../data/SudokuStateRepository"
import { isViewingHighscoreUseCase } from "../../../domain/usecase/highscore/IsViewingHighscoreUseCase"

interface DifficultySelectionProps {
  resetPuzzle: (difficulty: Difficulty) => void
}

const DifficultySelection = (
  { resetPuzzle }: DifficultySelectionProps
) => {

  const sudokuState = useSubscribe(
    sudokuStateRepository.getState$(),
    sudokuStateRepository.getState()
  )
  const isViewingHighscore = useSubscribe(
    isViewingHighscoreUseCase.perform$(),
    isViewingHighscoreUseCase.perform()
  )

  function getStyle(difficulty: Difficulty) {
    if (currentDifficulty == difficulty) {
      return styles.selected
    } else {
      return styles.unselected
    }
  }

  const currentDifficulty = sudokuState.difficulty
  const opacity = isViewingHighscore ? 0 : 1
  const pointerEvents = isViewingHighscore ? "none" : "visible"

  return (
    <div className='difficulty-selection' style={{ 
      opacity: opacity,
      pointerEvents: pointerEvents
    }}>
      <div>
        <button 
          className={getStyle('easy')} 
          onClick={() => resetPuzzle('easy')}>
            Easy
        </button>
        <button 
          className={getStyle('medium')} 
          onClick={() => resetPuzzle('medium')}>
            Medium
        </button>
      </div>
      <div>
        <button 
          className={getStyle('hard')} 
          onClick={() => resetPuzzle('hard')}>
            Hard
        </button>
        <button 
          className={getStyle('expert')} 
          onClick={() => resetPuzzle('expert')}>
            Expert
        </button>
      </div>
    </div>
  )
}

export default DifficultySelection
