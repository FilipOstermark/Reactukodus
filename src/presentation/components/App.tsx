import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import './App.css'
import { getSudoku } from 'sudoku-gen'
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type'
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type'
import Grid from './Grid'
import GridCell from './GridCell'
import DifficultySelection from './DifficultySelection'
import NumberSelection from './NumberSelection'
import { ALLOWED_CELL_VALUES, CELL_NO_SELECTION_INDEX, CELL_NO_VALUE, GRID_CELL_INDEX_MAX, GRID_CELL_INDEX_MIN, GRID_NUM_CELLS } from '../../core/common/global-constants'
import highscoreRepository from '../../data/HighscoreRepository'
import { SudokuState, updateSudokuState } from '../../domain/SudokuState'
import { isLockedCell, validateSolution } from '../../core/common/utils-sudoku'
import { toDisplayTime } from '../../core/common/utils-common'

let sudoku: Sudoku = getSudoku('easy')
let sudokuStateHistory: SudokuState[] = []

const App: React.FC = () => {
  const [sudokuState, setSudokuState] = useState(
    new SudokuState(
      sudoku.puzzle, 
      sudoku.puzzle, 
      sudoku.solution, 
      sudoku.difficulty
    )
  )

  const [selectedCellIndex, setSelectedCellIndex] = useState(-1)
  const [highlightedCellValue, setHighlightedCellValue] = useState(CELL_NO_VALUE)
  const [isNotesMode, setIsNotesMode] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const displaySeconds = toDisplayTime(elapsedSeconds % 60)
  const displayMinutes = toDisplayTime(Math.floor(elapsedSeconds / 60) % 60)
  const displayStopwatch = `${displayMinutes}:${displaySeconds}`

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        return setElapsedSeconds(
          prevElapsedSeconds => {
            return prevElapsedSeconds + 1
          }
        )
      }, 
      1_000
    )

    return () => { clearInterval(intervalId) }
  }, [elapsedSeconds])

  useEffect(() => {
    if (validateSolution(sudokuState.solution, sudokuState.puzzle)) {
      highscoreRepository.addScore(displayStopwatch, sudokuState.difficulty)
      const displayHighscore = 
        highscoreRepository.getHighscore()[sudokuState.difficulty].join("\n")

      alert(`You solved it, congratulations!\nCurrent highscore:\n${displayHighscore}`)
    }
  }, [sudokuState])

  function resetGame(difficulty: Difficulty) {
    sudoku = getSudoku(difficulty)

    setElapsedSeconds(0)
    setIsNotesMode(false)

    sudokuStateHistory = []
    setSudokuState(
      new SudokuState(
        sudoku.puzzle,
        sudoku.puzzle,
        sudoku.solution,
        sudoku.difficulty
      )
    )
  }

  function wrapCellIndex(index: number): number {
    if (index < GRID_CELL_INDEX_MIN) return index + GRID_NUM_CELLS
    else if (index > GRID_CELL_INDEX_MAX) return index - GRID_NUM_CELLS
    
    return index
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const key = event.key
    const isNumeric = ALLOWED_CELL_VALUES.includes(key)
    const value = isNumeric ? key : CELL_NO_VALUE
    const arrowKeyModifiers: Map<string, number> = new Map([
      ['ArrowUp', -9],
      ['ArrowDown', +9],
      ['ArrowLeft', -1],
      ['ArrowRight', +1],
    ])

    if (selectedCellIndex === -1 && isNumeric) {
      setHighlightedCellValue(prev => {
        if (prev === value) {
          return CELL_NO_VALUE
        } else {
          return value
        }
      })
      return
    }
    
    if (
      arrowKeyModifiers.has(event.key) && 
      selectedCellIndex != CELL_NO_SELECTION_INDEX
    ) {
      setSelectedCellIndex(prev => {
        const modifer: number = arrowKeyModifiers.get(key) ?? 0
        return wrapCellIndex(prev + modifer)  
      })

      return
    }

    setSudokuState(prev => {
      sudokuStateHistory.push(prev)
      return updateSudokuState(prev, selectedCellIndex, value, isNotesMode)
    })
  }

  function handleNotesButtonClick() {
    setIsNotesMode(prevIsNotesMode => {
      return !prevIsNotesMode
    })
  }

  function handleUndoButtonClick() {
    if (sudokuStateHistory.length === 0) {
      return
    }

    const prevState = sudokuStateHistory.pop()
    if (prevState !== undefined) {
      setSudokuState(prevState)
    }
  }

  const gridComponent = useMemo(() => {
    const gridCells: Array<ReactNode> = sudokuState.puzzle.split("").map(
      (value: string, index: number) => {
        return GridCell(
          {
            index: index,
            cellValue: value,
            highlightedCellValue: highlightedCellValue,
            selectedCellIndex: selectedCellIndex,
            isLockedCell: isLockedCell(index, sudokuState.originalPuzzle),
            notes: sudokuState.notes[index],
            handleValueInput: (index: number, value: string) => {
              setSudokuState(prev => {
                sudokuStateHistory.push(prev)
                return updateSudokuState(prev, index, value, isNotesMode)
              })
            },
            setSelectedCellIndex: setSelectedCellIndex
          }
        )
      }
    )

    return (<Grid gridCells={gridCells} />)
  }, [highlightedCellValue, selectedCellIndex, sudokuState, isNotesMode])

  return (
    <div className='app-base' tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      <DifficultySelection
        currentDifficulty={sudokuState.difficulty} 
        resetPuzzle={resetGame} />
      {gridComponent}
      <h3>{displayStopwatch}</h3>
      <NumberSelection 
        selectedCellIndex={selectedCellIndex} 
        highlightedCellValue={highlightedCellValue} 
        handleValueInput={(index: number, value: string) => {
          if (index < GRID_CELL_INDEX_MIN || index > GRID_CELL_INDEX_MAX) {
            if (value === highlightedCellValue) {
              setHighlightedCellValue(CELL_NO_VALUE)
            } else {
              setHighlightedCellValue(value)
            }
            return
          }

          setSudokuState(prev => {
            sudokuStateHistory.push(prev)
            return updateSudokuState(
              prev, index, value, isNotesMode
            )
          })
        }} />
      <div className='utility-buttons'>
        <button 
          className='utility-button' 
          onClick={handleNotesButtonClick}
          data-is-notes-mode={isNotesMode}>
            Notes
        </button>
        <button 
          className='utility-button'
          onClick={handleUndoButtonClick}>
            Undo
        </button>
      </div>
    </div>
  )
}

export default App
