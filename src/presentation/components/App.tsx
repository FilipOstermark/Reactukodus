import React, { useEffect, useState } from 'react'
import './App.css'
import { getSudoku } from 'sudoku-gen'
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type'
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type'
import Grid from './sudoku/Grid'
import DifficultySelection from './difficultyselection/DifficultySelection'
import NumberSelection from './numberselection/NumberSelection'
import { ALLOWED_CELL_VALUES, ARROW_KEYS, ARROW_KEY_INDEX_MODIFIERS, NO_CELL_SELECTED_INDEX, EMPTY_CELL_VALUE, GRID_CELL_INDEX_MAX, GRID_CELL_INDEX_MIN } from '../../common/global-constants'
import { isAnyCellSelected, isHighlightValueChange, wrapCellIndex } from '../../common/utils-sudoku'
import { HighscoreView } from './highscore/HighScoreView'
import { sudokuStateRepository } from '../../data/SudokuStateRepository'
import { updateSudokuStateUseCase } from '../../domain/usecase/UpdateSudokuStateUseCase'
import { resetSudokuStateUseCase } from '../../domain/usecase/ResetSudokuStateUseCase'
import { addHighscoreUseCase } from '../../domain/usecase/AddHighscoreUseCase'
import { stopwatch } from '../../domain/usecase/Stopwatch'
import { Stopwatch } from './stopwatch/Stopwatch'
import { toDisplayHHMM } from '../../common/utils-common'
import { isSudokuSolvedUseCase } from '../../domain/usecase/IsSudokuSolvedUseCase'
import { UtilityButtons } from './utilitybuttons/UtilityButtons'
import { gameControlRepository } from '../../data/GameControlRepository'
import { showHighscoreUseCase } from '../../domain/usecase/ShowHighscoreUseCase'

let sudoku: Sudoku = getSudoku('easy')

const App = () => {
  const [sudokuState, setSudokuState] = useState(
    sudokuStateRepository.getState()
  )

  useEffect(() => {
    const subscriptions = [
      sudokuStateRepository
        .getState$()
        .subscribe(state => {
          setSudokuState(state)
        }),
      isSudokuSolvedUseCase
        .perform$()
        .subscribe(isSolved => {
          if (isSolved) {
            stopwatch.stop()
            addHighscoreUseCase.perform(
              toDisplayHHMM(stopwatch.getElapsedSeconds()),
              sudokuStateRepository.getState().difficulty
            )

            showHighscoreUseCase.perform()
          }
        }),
      gameControlRepository
        .selectedCellIndex$()
        .subscribe(value => {
          setSelectedCellIndex(value)
        }),
      gameControlRepository
        .highlightedCellValue$()
        .subscribe(value => {
          setHighlightedCellValue(value)
        }),
      gameControlRepository
        .isNotesMode$()
        .subscribe(value => {
          setIsNotesMode(value)
        }),
      gameControlRepository
        .isViewingHighscore$()
        .subscribe(value => {
          setIsViewingHighscore(value)
        })
    ]

    stopwatch.start()

    return () => { 
      subscriptions.forEach(subscription => { 
        subscription.unsubscribe() 
      })
      stopwatch.stop()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [selectedCellIndex, setSelectedCellIndex] = useState(NO_CELL_SELECTED_INDEX)
  const [highlightedCellValue, setHighlightedCellValue] = useState(EMPTY_CELL_VALUE)
  const [isNotesMode, setIsNotesMode] = useState(gameControlRepository.isNotesMode())
  const [isViewingHighscore, setIsViewingHighscore] = useState(gameControlRepository.isViewingHighscore())
  const [startAnimationTrigger, setStartAnimationTrigger] = useState(0)

  /*
   * UseEffect is applied here in order to delay the sudoku update until after
   * the animation render has started. This prevents display of the new sudoku
   * for a split second before the pop-in animation starts.
   * 
   * TODO Find a better way to implement this behavior.
   */
  useEffect(() => {
    gameControlRepository.setNotesMode(false)
    gameControlRepository.setHighlightedCellValue(EMPTY_CELL_VALUE)
    resetSudokuStateUseCase.perform(sudoku.difficulty)
    
    stopwatch.start()
  }, [startAnimationTrigger])

  function resetGame(difficulty: Difficulty) {
    sudoku = getSudoku(difficulty)
    setStartAnimationTrigger(prev => { return prev + 1 })
  }

  // TODO Replace function with use case
  function handleHighlightValueChange(newValue: string) {
    const highlightedCellValue = gameControlRepository.highlightedCellValue()
    if (highlightedCellValue === newValue) {
      gameControlRepository.setHighlightedCellValue(EMPTY_CELL_VALUE)
    } else {
      gameControlRepository.setHighlightedCellValue(newValue)
    }    
  }

  function handleArrowKeyDown(key: string) {
    const selectedCellIndex = gameControlRepository.selectedCellIndex()
    const modifer: number = ARROW_KEY_INDEX_MODIFIERS.get(key) ?? 0
    gameControlRepository.setSelectedCellIndex(
      wrapCellIndex(selectedCellIndex + modifer)
    )
  }

  function handleCellValueUpdate(value: string) {
    updateSudokuStateUseCase.perform(
      selectedCellIndex,
      value,
      isNotesMode
    )
  }

  function handleKeyDown({ key }: React.KeyboardEvent<HTMLDivElement>) {
    const isNumeric = ALLOWED_CELL_VALUES.includes(key)
    const value = isNumeric ? key : EMPTY_CELL_VALUE

    if (isHighlightValueChange(selectedCellIndex, key)) {
      handleHighlightValueChange(value)
    } else if (
      ARROW_KEYS.includes(key) && 
      isAnyCellSelected(selectedCellIndex)
    ) {
      handleArrowKeyDown(key)
    } else {
      handleCellValueUpdate(value)
    }
  }

  function updateSelectedCellIndex(currentIndex: number, clickedIndex: number) {
    const newIndex = currentIndex === clickedIndex ? NO_CELL_SELECTED_INDEX : clickedIndex
    if (highlightedCellValue == EMPTY_CELL_VALUE) {
      gameControlRepository.setSelectedCellIndex(newIndex)
    } else {
      updateSudokuStateUseCase.perform(
        clickedIndex,
        highlightedCellValue,
        isNotesMode
      )
    }
  }

  return (
    <div className='app-base' tabIndex={0} onKeyDown={e => handleKeyDown(e)}>
      <DifficultySelection
        currentDifficulty={sudokuState.difficulty} 
        resetPuzzle={resetGame} />
      <div className='sudoku-grid-wrapper'>
        <Grid 
          isSolved={isViewingHighscore} 
          sudokuState={sudokuState}
          highlightedCellValue={highlightedCellValue}
          selectedCellIndex={selectedCellIndex}
          startAnimationTrigger={startAnimationTrigger}
          updateSelectedCellIndex={updateSelectedCellIndex} />
        <HighscoreView />
      </div>
      <Stopwatch stopwatch={stopwatch} />
      <NumberSelection 
        selectedCellIndex={selectedCellIndex} 
        highlightedCellValue={highlightedCellValue} 
        handleValueInput={(index: number, value: string) => {
          if (index < GRID_CELL_INDEX_MIN || index > GRID_CELL_INDEX_MAX) {
            // TODO Replace with use case
            if (value === gameControlRepository.highlightedCellValue()) {
              gameControlRepository.setHighlightedCellValue(EMPTY_CELL_VALUE)
            } else {
              gameControlRepository.setHighlightedCellValue(value)
            }
            return
          }

          updateSudokuStateUseCase.perform(
            index, 
            value, 
            isNotesMode
          )
        }} />
      <UtilityButtons />
    </div>
  )
}

export default App
