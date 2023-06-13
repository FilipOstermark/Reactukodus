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

const GridLineEmphasis: React.FC = () => {
    return (
        <>
        <div className='gridline-emphasis'>
            <div className='gridline-emphasis-vertical' />
            <div className='gridline-emphasis-vertical' />
        </div>
        <div className='gridline-emphasis flex-direction-column'>
            <div className='gridline-emphasis-horizontal' />
            <div className='gridline-emphasis-horizontal' />
        </div>
        </>
    )
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

    return (
        <div className='sudoku-grid-wrapper'>
            <div className='sudoku-grid'>{gridCells}</div>
            <GridLineEmphasis />
        </div>
    )
}

export default Grid