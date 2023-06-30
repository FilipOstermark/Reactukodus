import React, { ReactNode, useEffect, useState } from 'react'
import './App.css'
import { getSudoku } from 'sudoku-gen'
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type'
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type'
import Grid from './sudoku/Grid'
import GridCell from './sudoku/GridCell'
import DifficultySelection from './difficultyselection/DifficultySelection'
import NumberSelection from './numberselection/NumberSelection'
import { ALLOWED_CELL_VALUES, ARROW_KEYS, ARROW_KEY_INDEX_MODIFIERS, NO_CELL_SELECTED_INDEX, EMPTY_CELL_VALUE, GRID_CELL_INDEX_MAX, GRID_CELL_INDEX_MIN } from '../../common/global-constants'
import highscoreRepository from '../../data/HighscoreRepository'
import { isAnyCellSelected, isHighlightValueChange, isLockedCell, wrapCellIndex } from '../../common/utils-sudoku'
import { HighscoreView } from './highscore/HighScoreView'
import NotesIcon from '../assets/edit-box-icon.svg'
import UndoIcon from '../assets/undo-icon.svg'
import HighscoreIcon from '../assets/highscore-icon.svg'
import { sudokuStateRepository } from '../../data/SudokuStateRepository'
import { updateSudokuStateUseCase } from '../../domain/usecase/UpdateSudokuStateUseCase'
import { resetSudokuStateUseCase } from '../../domain/usecase/ResetSudokuStateUseCase'
import { undoSudokuStateUseCase } from '../../domain/usecase/UndoSudokuStateUseCase'
import { addHighscoreUseCase } from '../../domain/usecase/AddHighscoreUseCase'
import { stopwatch } from '../../domain/usecase/Stopwatch'
import { Stopwatch } from './stopwatch/Stopwatch'
import { toDisplayHHMM } from '../../common/utils-common'
import { isSudokuSolvedUseCase } from '../../domain/usecase/IsSudokuSolvedUseCase'

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
      highscoreRepository
        .getHighscore$()
        .subscribe(highscore => {
          setHighscore(highscore)
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

            setIsViewingHighscore(true)
          }

          setIsSolved(isSolved)
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
  const [isNotesMode, setIsNotesMode] = useState(false)
  const [highscore, setHighscore] = useState(highscoreRepository.getHighscore())
  const [isSolved, setIsSolved] = useState(false)
  const [isViewingHighscore, setIsViewingHighscore] = useState(false)
  const [startAnimationTrigger, setStartAnimationTrigger] = useState(0)

  /*
   * UseEffect is applied here in order to delay the sudoku update until after
   * the animation render has started. This prevents display of the new sudoku
   * for a split second before the pop-in animation starts.
   * 
   * TODO Find a better way to implement this behavior.
   */
  useEffect(() => {
    setIsNotesMode(false)
    setHighlightedCellValue(EMPTY_CELL_VALUE)
    resetSudokuStateUseCase.perform(sudoku.difficulty)
    
    stopwatch.start()
  }, [startAnimationTrigger])

  function resetGame(difficulty: Difficulty) {
    sudoku = getSudoku(difficulty)
    setStartAnimationTrigger(prev => { return prev + 1 })
  }

  function handleHighlightValueChange(newValue: string) {
    setHighlightedCellValue(prev => {
      if (prev === newValue) {
        return EMPTY_CELL_VALUE
      } else {
        return newValue
      }
    })
  }


  function handleArrowKeyDown(key: string) {
    setSelectedCellIndex(prev => {
      const modifer: number = ARROW_KEY_INDEX_MODIFIERS.get(key) ?? 0
      return wrapCellIndex(prev + modifer)  
    })
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

  function handleNotesButtonClick() {
    setIsNotesMode(prevIsNotesMode => {
      return !prevIsNotesMode
    })
  }

  function handleUndoButtonClick() {
    undoSudokuStateUseCase.perform()
  }

  function handleHighscoreButtonClick() {
    setIsViewingHighscore(prev => {
      if (isSolved && prev) {
        resetGame(sudokuState.difficulty)
        return false
      }

      return !prev
    })
  }

  const highscoreComponent = (
    <HighscoreView 
      highscore={highscore} 
      difficulty={sudokuState.difficulty}
      isSolved={isSolved}
      isViewingHighscore={isViewingHighscore} />
  )

  function gridFactory() {
    const gridCells: Array<ReactNode> = sudokuState.puzzle.split('').map(
      (value: string, index: number) => {
        return GridCell(
          {
            index: index,
            cellValue: value,
            highlightedCellValue: highlightedCellValue,
            selectedCellIndex: selectedCellIndex,
            isLockedCell: isLockedCell(index, sudokuState.originalPuzzle),
            notes: sudokuState.notes[index],
            isSolved: isSolved,
            triggerPopinAnimation: startAnimationTrigger,
            handleValueInput: (index: number, value: string) => {
              updateSudokuStateUseCase.perform(
                index,
                value,
                isNotesMode
              )
            },
            setSelectedCellIndex: setSelectedCellIndex
          }
        )
      }
    )

    return (
      <Grid 
        gridCells={gridCells} 
        highscoreView={highscoreComponent} 
        isSolved={isSolved || isViewingHighscore} />
    )
  }

  return (
    <div className='app-base' tabIndex={0} onKeyDown={e => handleKeyDown(e)}>
      <DifficultySelection
        currentDifficulty={sudokuState.difficulty} 
        resetPuzzle={resetGame} />
      {gridFactory()}
      <Stopwatch stopwatch={stopwatch} />
      <NumberSelection 
        selectedCellIndex={selectedCellIndex} 
        highlightedCellValue={highlightedCellValue} 
        handleValueInput={(index: number, value: string) => {
          if (index < GRID_CELL_INDEX_MIN || index > GRID_CELL_INDEX_MAX) {
            if (value === highlightedCellValue) {
              setHighlightedCellValue(EMPTY_CELL_VALUE)
            } else {
              setHighlightedCellValue(value)
            }
            return
          }

          updateSudokuStateUseCase.perform(
            index, 
            value, 
            isNotesMode
          )
        }} />
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
    </div>
  )
}

interface IconButtonProps {
  isFilled: boolean
  iconSrc: string
  onClick: () => void
}

const IconButton = (props: IconButtonProps) => {
  return (
    <button 
      className='utility-button'
      data-is-filled={props.isFilled}
      onClick={props.onClick}>
      <img className='icon' src={props.iconSrc} />
    </button>
  )
}

export default App
