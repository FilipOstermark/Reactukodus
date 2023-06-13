import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import styles from "./DifficultySelection.module.css"


interface DifficultySelectionProps {
    currentDifficulty: Difficulty,
    resetPuzzle: (difficulty: Difficulty) => void
}

const DifficultySelection: React.FC<DifficultySelectionProps> = (
    { currentDifficulty, resetPuzzle }: DifficultySelectionProps
) => {
    
    function getStyle(difficulty: Difficulty) {
        if (currentDifficulty == difficulty) {
            return styles.selected
        } else {
            return styles.unselected
        }
    }

    return(
        <div className='difficulty-selection'>
          <div>
            <button className={getStyle('easy')} onClick={() => resetPuzzle('easy')}>Easy</button>
            <button className={getStyle('medium')} onClick={() => resetPuzzle('medium')}>Medium</button>
          </div>
          <div>
            <button className={getStyle('hard')} onClick={() => resetPuzzle('hard')}>Hard</button>
            <button className={getStyle('expert')} onClick={() => resetPuzzle('expert')}>Expert</button>
          </div>
        </div>
    )
}

export default DifficultySelection
