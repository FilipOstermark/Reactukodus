import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { HighscoreEntry } from "../../../domain/model/HighscoreEntry"
import styles from "./HighscoreView.module.css"
import { useEffect, useState } from "react"
import { showHighscoreUseCase } from "../../../domain/usecase/ShowHighscoreUseCase"
import { gameControlRepository } from "../../../data/GameControlRepository"
import highscoreRepository from "../../../data/HighscoreRepository"

export const HighscoreView = () => {

  const [selectedDifficulty, setSelectedDifficulty] = useState(
    gameControlRepository.highscoreViewDifficulty()
  )
  const [isViewingHighscore, setIsViewingHighscore] = useState(
    gameControlRepository.isViewingHighscore()
  )
  const [highscore, setHighscore] = useState(
    highscoreRepository.getHighscore()
  )

  useEffect(() => {
    const highscoreViewDifficultySubscription = gameControlRepository
      .highscoreViewDifficulty$()
      .subscribe(value => {
        setSelectedDifficulty(value)
      })
    const isViewingHighscoreSubscription = gameControlRepository
      .isViewingHighscore$()
      .subscribe(value => {
        setIsViewingHighscore(value)
      })
    const highscoreSubscription = highscoreRepository
      .getHighscore$()
      .subscribe(value => {
        setHighscore(value)
      })
    
    return () => {
      highscoreViewDifficultySubscription.unsubscribe()
      isViewingHighscoreSubscription.unsubscribe()
      highscoreSubscription.unsubscribe()
    }
  }, [])

  const epochTimes = highscore[selectedDifficulty].map(entry => {
    return entry.epochTimeMillis
  })
  const mostRecentEpochTime = Math.max(...epochTimes)

  const scoreList = highscore[selectedDifficulty].map(
    ({ score, epochTimeMillis }: HighscoreEntry, index: number) => {
      const isMostRecentEntry = epochTimeMillis === mostRecentEpochTime
      return (
        <p 
          key={index} 
          className="highscore-entry"
          data-is-most-recent={isMostRecentEntry}
        >
          <b>{index + 1}.</b>{score}
        </p>
      )
    }
  )

  function onClickDifficultySelect(difficulty: Difficulty) {
    showHighscoreUseCase.perform(difficulty)
  }

  return (
    <div 
      className="highscore" 
      data-is-solved={isViewingHighscore}
    >
      <h1 className="highscore-heading">Highscore</h1>
      <div className={styles["highscore-difficulties"]}>
        <h2 
          className={styles["highscore-difficulty"]}
          data-is-selected={selectedDifficulty == 'easy'}
          onClick={() => onClickDifficultySelect('easy')}>{"easy"}</h2>
        <h2 
          className={styles["highscore-difficulty"]}
          data-is-selected={selectedDifficulty == 'medium'}
          onClick={() => onClickDifficultySelect('medium')}>{"medium"}</h2>
        <h2 
          className={styles["highscore-difficulty"]}
          data-is-selected={selectedDifficulty == 'hard'}
          onClick={() => onClickDifficultySelect('hard')}>{"hard"}</h2>
        <h2 
          className={styles["highscore-difficulty"]}
          data-is-selected={selectedDifficulty == 'expert'}
          onClick={() => onClickDifficultySelect('expert')}>{"expert"}</h2>
      </div>
      {scoreList}
    </div>
  )
}