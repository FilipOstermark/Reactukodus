import React, { ReactNode, useEffect, useState } from 'react'
import './App.css'
import { getSudoku } from 'sudoku-gen'
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type'
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type'
import Grid from './Grid'
import GridCell from './GridCell'
import DifficultySelection from './DifficultySelection'
import NumberSelection from './NumberSelection'
import { ALLOWED_CELL_VALUES, CELL_NO_SELECTION_INDEX, CELL_NO_VALUE, GRID_CELL_INDEX_MAX, GRID_CELL_INDEX_MIN, GRID_NUM_CELLS } from '../../core/common/global-constants'
import { clearIntersectingNotesOnInput } from '../../core/common/utils-sudoku'
import highscoreRepository from '../../data/HighscoreRepository'

let sudoku: Sudoku = getSudoku('easy')

function validateSolution(expected: string, actual: string): boolean {
  console.log(`e: ${expected}\na: ${actual}`)
  return expected === actual
}

function isLockedCell(index: number): boolean {
  if (index < GRID_CELL_INDEX_MIN || index > GRID_CELL_INDEX_MAX) {
    return true
  }

  return sudoku.puzzle[index] != CELL_NO_VALUE
}

function toDisplayTime(num: number): string {
  return new String(num).padStart(2, '0')
}

class SudokuState {

  readonly puzzle: string
  readonly solution: string
  readonly difficulty: 'easy'|'medium'|'hard'|'expert'
  readonly notes: Array<string>
  readonly selectedCellIndex: number
  readonly highlightedCellValue: string

  constructor(
    puzzle: string, 
    solution: string, 
    difficulty: 'easy'|'medium'|'hard'|'expert',
    notes: Array<string> = Array(GRID_NUM_CELLS).fill(""),
    selectedCellIndex = -1,
    highlightedCellValue = '-'
  ) {
    this.puzzle = puzzle
    this.solution = solution
    this.difficulty = difficulty
    this.notes = notes
    this.selectedCellIndex = selectedCellIndex
    this.highlightedCellValue = highlightedCellValue
  }

  public handleCellInput(index: number, value: string, isNote: boolean): SudokuState {
    if (index < GRID_CELL_INDEX_MIN || index > GRID_CELL_INDEX_MAX) {
      const newHighlightedCellValue = 
        this.highlightedCellValue == value ? CELL_NO_VALUE : value
      return new SudokuState(
        this.puzzle,
        this.solution,
        this.difficulty,
        this.notes,
        this.selectedCellIndex,
        newHighlightedCellValue
      )
    } else if (isLockedCell(index)) {
      return {...this}
    }

    if (isNote && this.puzzle[index] == CELL_NO_VALUE) {
      const newNotes = [...this.notes]
      const cellNotes: string = newNotes[index]
      if (cellNotes.includes(value)) {
        newNotes[index] = cellNotes.replace(value, "")
      } else {
        newNotes[index] += value
      }

      return new SudokuState(
        this.puzzle,
        this.solution,
        this.difficulty,
        newNotes,
        this.selectedCellIndex,
        this.highlightedCellValue
      )
    }

    const newNotes = clearIntersectingNotesOnInput(index, value, this.notes)
    newNotes[index] = ""

    const newPuzzle = this.puzzle.substring(0, index) + value + this.puzzle.substring(index + 1)
    
    return new SudokuState(
      newPuzzle,
      this.solution,
      this.difficulty,
      newNotes,
      this.selectedCellIndex,
      this.highlightedCellValue
    )
  }

  public updateSelectedIndex(newSelectedCellIndex: number): SudokuState {
    return new SudokuState(
      this.puzzle,
      this.solution,
      this.difficulty,
      this.notes,
      newSelectedCellIndex,
      this.highlightedCellValue
    )
  }
}

const App: React.FC = () => {
  /*const [puzzle, setPuzzle] = useState(sudoku.puzzle)
  const [difficulty, setDifficulty] = useState(sudoku.difficulty)
  const [selectedCellIndex, setSelectedCellIndex] = useState(CELL_NO_SELECTION_INDEX)
  const [highlightedCellValue, setHighlightedCellValue] = useState(CELL_NO_VALUE)
  const [notes, setNotes] = useState(Array(GRID_NUM_CELLS).fill(""))*/
  
  const [sudokuState, setSudokuState] = useState(
    new SudokuState(sudoku.puzzle, sudoku.solution, sudoku.difficulty)
  )

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
  }, [sudokuState, displayStopwatch])

  function resetGame(difficulty: Difficulty) {
    sudoku = getSudoku(difficulty)

    setElapsedSeconds(0)
    setIsNotesMode(false)

    setSudokuState(
      new SudokuState(
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
    const value = ALLOWED_CELL_VALUES.includes(key) ? key : CELL_NO_VALUE
    const arrowKeyModifiers: Map<string, number> = new Map([
      ['ArrowUp', -9],
      ['ArrowDown', +9],
      ['ArrowLeft', -1],
      ['ArrowRight', +1],
    ])
    if (
      arrowKeyModifiers.has(event.key) && 
      sudokuState.selectedCellIndex != CELL_NO_SELECTION_INDEX
    ) {
      setSudokuState(prev => {
        const modifer: number = arrowKeyModifiers.get(key) ?? 0
        const newSelectedCellIndex = wrapCellIndex(prev.selectedCellIndex + modifer)  
        return prev.updateSelectedIndex(newSelectedCellIndex)
      })

      return
    }

    setSudokuState(prev => {
      return prev.handleCellInput(
        prev.selectedCellIndex,
        value,
        isNotesMode
      )
    })
  }

  function handleNotesButtonClick() {
    setIsNotesMode(prevIsNotesMode => {
      return !prevIsNotesMode
    })
  }

  const grid: Array<ReactNode> = sudokuState.puzzle.split("").map(
    (value: string, index: number) => {
      return GridCell(
        {
          index: index,
          cellValue: value,
          highlightedCellValue: sudokuState.highlightedCellValue,
          selectedCellIndex: sudokuState.selectedCellIndex,
          isLockedCell: isLockedCell(index),
          notes: sudokuState.notes[index],
          handleValueInput: (index: number, value: string) => {
            setSudokuState(prev => {
              return prev.handleCellInput(
                index, value, isNotesMode
              )
            })
          },
          setSelectedCellIndex: (index: number) => {
            setSudokuState(prev => {
              return prev.updateSelectedIndex(index)
            })
          }
        }
      )
    }
  )

  return (
    <div className='app-base' tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      <DifficultySelection
        currentDifficulty={sudokuState.difficulty} 
        resetPuzzle={resetGame} />
      <Grid gridCells={grid} />
      <h3>{displayStopwatch}</h3>
      <NumberSelection 
        selectedCellIndex={sudokuState.selectedCellIndex} 
        highlightedCellValue={sudokuState.highlightedCellValue} 
        handleValueInput={(index: number, value: string) => {
          setSudokuState(prev => {
            return prev.handleCellInput(
              index, value, isNotesMode
            )
          })
        }} />
      <button 
        className='utility-button' 
        onClick={handleNotesButtonClick}
        data-is-notes-mode={isNotesMode}>
          Notes
      </button>
    </div>
  )
}

export default App
