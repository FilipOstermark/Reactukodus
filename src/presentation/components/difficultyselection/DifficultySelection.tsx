import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import styles from "./DifficultySelection.module.css"
import { useEffect, useState } from "react"
import { gameControlRepository } from "../../../data/GameControlRepository"


interface DifficultySelectionProps {
  currentDifficulty: Difficulty,
  resetPuzzle: (difficulty: Difficulty) => void
}

const DifficultySelection = (
  { currentDifficulty, resetPuzzle }: DifficultySelectionProps
) => {

  const [isViewingHighscore, setIsViewingHighscore] = useState(
    gameControlRepository.isViewingHighscore()
  )

  useEffect(() => {
    const isViewingHighscoreSubscription = gameControlRepository
      .isViewingHighscore$()
      .subscribe(value => {
        setIsViewingHighscore(value)
      })

    return () => {
      isViewingHighscoreSubscription.unsubscribe()
    }
  }, [])

  function getStyle(difficulty: Difficulty) {
    if (currentDifficulty == difficulty) {
      return styles.selected
    } else {
      return styles.unselected
    }
  }

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
