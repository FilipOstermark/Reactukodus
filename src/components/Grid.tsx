import React from "react"
import GridCell from "./GridCell"
import { GRID_NUM_CELLS } from "../global-constants"


export interface GridProps {
    puzzle: string
    highlightedCellValue: string
    selectedCellIndex: number
    isLockedCell: (index: number) => boolean
    handleValueInput: (index: number, value: string) => void
    setSelectedCellIndex: (idx: number) => void
}

const Grid: React.FC<GridProps> = (
    {
        puzzle,
        highlightedCellValue,
        selectedCellIndex,
        isLockedCell,
        handleValueInput,
        setSelectedCellIndex
    }: GridProps
) => {
    const gridCells = Array(81)
    for (let i = 0; i < GRID_NUM_CELLS; i++) {
        gridCells[i] = GridCell(
            {
                index: i, 
                cellValue: puzzle[i],
                highlightedCellValue: highlightedCellValue,
                selectedCellIndex: selectedCellIndex,
                isLockedCell: isLockedCell(i),
                handleValueInput: handleValueInput,
                setSelectedCellIndex: setSelectedCellIndex 
            }
        )
    }

    return (<div className='sudoku-grid'>{gridCells}</div>)
}

export default Grid