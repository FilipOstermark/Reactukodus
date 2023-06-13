import React from 'react'

export interface GridCellProps {
  index: number
  cellValue: string
  highlightedCellValue: string
  handleValueInput: (index: number, value: string) => void
  selectedCellIndex: number
  setSelectedCellIndex: (idx: number) => void
}

const GridCell: React.FC<GridCellProps> = (
  {
    index, 
    cellValue, 
    highlightedCellValue, 
    handleValueInput,
    selectedCellIndex,
    setSelectedCellIndex
  }: GridCellProps
) => {
  const indexX: number = index % 9
  const indexY: number = Math.floor(index / 9)
  const displayValue: string = cellValue === "-" ? "" : cellValue
  const isSelectedCell: boolean = selectedCellIndex == index
  const isHighlightedValue: boolean = highlightedCellValue != "-" && (cellValue == highlightedCellValue)
  const isHighlightShowing: boolean = isSelectedCell || isHighlightedValue

  function updateSelectedCellIndex(currentIndex: number, clickedIndex: number) {
    const newIndex = currentIndex === clickedIndex ? -1 : clickedIndex
    console.log(`Clicked ${clickedIndex}: ${currentIndex} => ${newIndex}`)

    if (highlightedCellValue == '-') {
      setSelectedCellIndex(newIndex)
    } else {
      handleValueInput(clickedIndex, highlightedCellValue)
    }
  }

  return (
    <div
      key={index}
      className='sudoku-grid-cell'
      data-x={indexX}
      data-y={indexY}
      onClick={() => updateSelectedCellIndex(selectedCellIndex, index)}
    >
      <div className='sudoku-grid-cell-highlight' data-is-selected={isHighlightShowing}>
        <p className='sudoku-grid-cell-number'>{displayValue}</p>
      </div>
    </div>
  )
}

export default GridCell