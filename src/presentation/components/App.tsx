import React, { ReactNode, useEffect, useState } from 'react'
import './App.css'
import { getSudoku } from 'sudoku-gen'
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type'
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type'
import Grid from './Grid'
import GridCell from './GridCell'
import DifficultySelection from './DifficultySelection'
import NumberSelection from './NumberSelection'
import { ALLOWED_CELL_VALUES, ARROW_KEYS, ARROW_KEY_INDEX_MODIFIERS, NO_CELL_SELECTED_INDEX, EMPTY_CELL_VALUE, GRID_CELL_INDEX_MAX, GRID_CELL_INDEX_MIN } from '../../core/common/global-constants'
import highscoreRepository from '../../data/HighscoreRepository'
import { SudokuState, updateSudokuState } from '../../domain/SudokuState'
import { isAnyCellSelected, isHighlightValueChange, isLockedCell, validateSolution, wrapCellIndex } from '../../core/common/utils-sudoku'
import { toDisplayTime } from '../../core/common/utils-common'
import { HighscoreView } from './HighScoreView'
import NotesIcon from '../../../public/edit-box-icon.svg'
import UndoIcon from '../../../public/undo-icon.svg'

let sudoku: Sudoku = getSudoku('easy')

const App = () => {
  const [sudokuState, setSudokuState] = useState(
    new SudokuState(
      sudoku.puzzle, 
      sudoku.puzzle, 
      sudoku.solution, 
      sudoku.difficulty
    )
  )

  const [selectedCellIndex, setSelectedCellIndex] = useState(NO_CELL_SELECTED_INDEX)
  const [highlightedCellValue, setHighlightedCellValue] = useState(EMPTY_CELL_VALUE)
  const [isNotesMode, setIsNotesMode] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [highscore, setHighscore] = useState(highscoreRepository.getHighscore())
  const [isSolved, setIsSolved] = useState(false)
  const [startAnimationTrigger, setStartAnimationTrigger] = useState(0)

  const displaySeconds = toDisplayTime(elapsedSeconds % 60)
  const displayMinutes = toDisplayTime(Math.floor(elapsedSeconds / 60) % 60)
  const displayStopwatch = `${displayMinutes}:${displaySeconds}`
  const stopwatchOpacity = isSolved ? 0 : 1

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        return setElapsedSeconds(
          prevElapsedSeconds => {
            if (validateSolution(sudokuState.solution, sudokuState.puzzle)) {
              return prevElapsedSeconds
            }

            return prevElapsedSeconds + 1
          }
        )
      }, 
      1_000
    )

    return () => { clearInterval(intervalId) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedSeconds])

  useEffect(() => {
    if (validateSolution(sudokuState.solution, sudokuState.puzzle)) {
      highscoreRepository.addScore(displayStopwatch, sudokuState.difficulty)
      setHighscore(highscoreRepository.getHighscore())
      setIsSolved(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sudokuState])


  useEffect(() => {
    setElapsedSeconds(0)
    setIsNotesMode(false)
    setHighlightedCellValue(EMPTY_CELL_VALUE)
    setIsSolved(false)
    setSudokuState(
      new SudokuState(
        sudoku.puzzle,
        sudoku.puzzle,
        // '-' + sudoku.solution.slice(1, 81),
        // '-' + sudoku.solution.slice(1, 81),
        sudoku.solution,
        sudoku.difficulty
      )
    )
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
    setSudokuState(prev => {
      return updateSudokuState(
        prev, 
        selectedCellIndex, 
        value, 
        isNotesMode
      )
    })
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
    const prevState = sudokuState.previousState
    if (prevState !== undefined) {
      setSudokuState(prevState)
    }
  }

  const highscoreComponent = (
    <HighscoreView 
      highscore={highscore} 
      difficulty={sudokuState.difficulty}
      isSolved={isSolved} />
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
              setSudokuState(prev => {
                return updateSudokuState(prev, index, value, isNotesMode)
              })
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
        isSolved={isSolved} />
    )
  }

  return (
    <div className='app-base' tabIndex={0} onKeyDown={e => handleKeyDown(e)}>
      <DifficultySelection
        currentDifficulty={sudokuState.difficulty} 
        resetPuzzle={resetGame} />
      {gridFactory()}
      <h3 style={{opacity: stopwatchOpacity}}>{displayStopwatch}</h3>
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

          setSudokuState(prev => {
            return updateSudokuState(
              prev, index, value, isNotesMode
            )
          })
        }} />
      <div className='utility-buttons'>
        <button 
          className='utility-button round' 
          onClick={handleNotesButtonClick}
          data-is-notes-mode={isNotesMode}>
          <img className='icon' src={NotesIcon} />
        </button>
        <button 
          className='utility-button'
          onClick={handleUndoButtonClick}>
          <img className='icon' src={UndoIcon} />
        </button>
      </div>
    </div>
  )
}

export default App
