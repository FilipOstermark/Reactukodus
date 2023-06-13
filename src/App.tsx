import React, { ReactNode, useEffect, useState } from 'react'
import './App.css'
import { getSudoku } from 'sudoku-gen'
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type'
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type'
import Grid from './components/Grid'
import GridCell from './components/GridCell'
import DifficultySelection from './components/DifficultySelection'
import NumberSelection from './components/NumberSelection'
import { CELL_NO_SELECTION_INDEX, CELL_NO_VALUE, GRID_CELL_INDEX_MAX, GRID_CELL_INDEX_MIN, GRID_NUM_CELLS } from './global-constants'

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

const App: React.FC = () => {
  const [puzzle, setPuzzle] = useState(sudoku.puzzle)
  const [difficulty, setDifficulty] = useState(sudoku.difficulty)
  const [selectedCellIndex, setSelectedCellIndex] = useState(CELL_NO_SELECTION_INDEX)
  const [highlightedCellValue, setHighlightedCellValue] = useState(CELL_NO_VALUE)
  const [notes, setNotes] = useState(Array(GRID_NUM_CELLS).fill(""))
  const [isNotesMode, setIsNotesMode] = useState(false)

  useEffect(() => {
    if (validateSolution(sudoku.solution, puzzle)) {
      alert("You solved it, congratulations!")
    }
  }, [puzzle])

  function resetPuzzle(difficulty: Difficulty) {
    sudoku = getSudoku(difficulty)
    
    setSelectedCellIndex(-1)
    setHighlightedCellValue('-')
    setPuzzle(sudoku.puzzle)
    setDifficulty(sudoku.difficulty)
  }

  function handleValueInput(index: number, value: string) {
    if (index < 0 || index > 81) {
      const newHighlightedCellValue = highlightedCellValue == value ? CELL_NO_VALUE : value
      setHighlightedCellValue(newHighlightedCellValue)
      return
    } else if (isLockedCell(index)) {
      return
    }

    setCellValue(index, value)
  }

  function setCellValue(index: number, value: string) {
    if (isNotesMode && puzzle[index] == CELL_NO_VALUE) {
      setNotes(prevNotes => {
        const newNotes = [...prevNotes]
        const cellNotes: string = newNotes[index]
        if (cellNotes.includes(value)) {
          newNotes[index] = cellNotes.replace(value, "")
        } else {
          newNotes[index] += value
        }
        return newNotes
      })

      return
    }

    const newPuzzle = puzzle.substring(0, index) + value + puzzle.substring(index + 1)
    setPuzzle(newPuzzle)
  }

  function wrapCellIndex(index: number): number {
    if (index < GRID_CELL_INDEX_MIN) return index + GRID_NUM_CELLS
    else if (index > GRID_CELL_INDEX_MAX) return index - GRID_NUM_CELLS
    
    return index
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const allowedCellValueKeys = "123456789"
    const key = event.key
    const value = allowedCellValueKeys.includes(key) ? key : CELL_NO_VALUE
    const arrowKeyModifiers: Map<string, number> = new Map([
      ['ArrowUp', -9],
      ['ArrowDown', +9],
      ['ArrowLeft', -1],
      ['ArrowRight', +1],
    ])
    const modifier: number = arrowKeyModifiers.get(key) ?? 0
    const newSelectedCellIndex = wrapCellIndex(selectedCellIndex + modifier)

    if (selectedCellIndex != CELL_NO_SELECTION_INDEX) {
      setSelectedCellIndex(newSelectedCellIndex)
    }

    handleValueInput(selectedCellIndex, value)
  }

  const grid: Array<ReactNode> = puzzle.split("").map(
    (value: string, index: number) => {
      return GridCell(
        {
          index: index,
          cellValue: value,
          highlightedCellValue: highlightedCellValue,
          selectedCellIndex: selectedCellIndex,
          isLockedCell: isLockedCell(index),
          notes: notes[index],
          handleValueInput: handleValueInput,
          setSelectedCellIndex: setSelectedCellIndex
        }
      )
    }
  )

  return (
    <div className='app-base' tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      <header>
        <h1>Sudoku</h1>
      </header>

      <DifficultySelection currentDifficulty={difficulty} resetPuzzle={resetPuzzle} />
      <Grid 
        puzzle={puzzle} 
        highlightedCellValue={highlightedCellValue}
        selectedCellIndex={selectedCellIndex}
        isLockedCell={isLockedCell}
        handleValueInput={handleValueInput}
        setSelectedCellIndex={setSelectedCellIndex}
        gridCells={grid} />
      <NumberSelection 
        selectedCellIndex={selectedCellIndex} 
        highlightedCellValue={highlightedCellValue} 
        handleValueInput={handleValueInput} />
    </div>
  )
}

export default App
