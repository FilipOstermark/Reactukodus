import React, { useEffect, useState } from 'react'
import './App.css'
import { getSudoku } from 'sudoku-gen';
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import Grid from './components/Grid';

var sudoku: Sudoku = getSudoku('easy')

function validateSolution(expected: string, actual: string): boolean {
  return expected === actual
}

function isLockedCell(index: number): boolean {
  if (index < 0 || index > 80) {
    return true
  }

  return sudoku.puzzle[index] != '-'
}

const App: React.FunctionComponent = () => {
  const [puzzle, setPuzzle] = useState(sudoku.puzzle)
  const [selectedCellIndex, setSelectedCellIndex] = useState(-1)
  const [highlightedCellValue, setHighlightedCellValue] = useState("-")

  function resetPuzzle(difficulty: Difficulty) {
    sudoku = getSudoku(difficulty)
    
    setSelectedCellIndex(-1)
    setHighlightedCellValue('-')
    setPuzzle(sudoku.puzzle)
  }

  function handleValueInput(index: number, value: string) {
    if (index < 0 || index > 81) {
      const newHighlightedCellValue = highlightedCellValue == value ? '-' : value
      setHighlightedCellValue(newHighlightedCellValue)
      return
    } else if (isLockedCell(index)) {
      return
    }

    setCellValue(index, value)

    if (validateSolution(sudoku.solution, puzzle)) {
      alert("You solved it, congratulations!")
    }
  }

  useEffect(() => {
    console.log("Rendered!")
  })

  function setCellValue(index: number, value: string) {
    const newPuzzle = puzzle.substring(0, index) + value + puzzle.substring(index + 1)
    setPuzzle(newPuzzle)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const allowedKeys = "123456789"
    const key = event.key
    const value = allowedKeys.includes(key) ? key : '-'
    
    handleValueInput(selectedCellIndex, value)
  }

  return (
    <div className='app-base' tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      <header>
        <h1>Sudoku</h1>
        <div className='difficulty-selection'>
          <button onClick={
            () => resetPuzzle('easy')
            }>Easy</button>
          <button onClick={
            () => resetPuzzle('medium')
            }>Medium</button>
          <button onClick={
            () => resetPuzzle('hard')
            }>Hard</button>
          <button onClick={
            () => resetPuzzle('expert')
            }>Expert</button>
        </div>
      </header>
      <div className='sudoku-grid'>
        <Grid 
          puzzle={puzzle} 
          highlightedCellValue={highlightedCellValue}
          handleValueInput={handleValueInput}
          selectedCellIndex={selectedCellIndex}
          setSelectedCellIndex={setSelectedCellIndex} />
      </div>
      <div className='number-selection'>
        <button onClick={() => handleValueInput(selectedCellIndex, "1")}>1</button>
        <button onClick={() => handleValueInput(selectedCellIndex, "2")}>2</button>
        <button onClick={() => handleValueInput(selectedCellIndex, "3")}>3</button>
        <button onClick={() => handleValueInput(selectedCellIndex, "4")}>4</button>
        <button onClick={() => handleValueInput(selectedCellIndex, "5")}>5</button>
        <button onClick={() => handleValueInput(selectedCellIndex, "6")}>6</button>
        <button onClick={() => handleValueInput(selectedCellIndex, "7")}>7</button>
        <button onClick={() => handleValueInput(selectedCellIndex, "8")}>8</button>
        <button onClick={() => handleValueInput(selectedCellIndex, "9")}>9</button>
        <button onClick={() => handleValueInput(selectedCellIndex, "-")}>-</button>
      </div>
    </div>
  )
}

export default App
