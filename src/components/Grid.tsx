import React from "react"
import GridCell from "./GridCell"


export interface GridProps {
    puzzle: string
    highlightedCellValue: string
    handleValueInput: (index: number, value: string) => void
    selectedCellIndex: number
    setSelectedCellIndex: (idx: number) => void
}

const Grid: React.FC<GridProps> = (
    {
        puzzle,
        highlightedCellValue,
        handleValueInput,
        selectedCellIndex,
        setSelectedCellIndex
    }: GridProps
) => {
    const gridCells = Array(81);
    for (var i = 0; i < 81; i++) {
        gridCells[i] = GridCell(
            {
                index: i, 
                cellValue: puzzle[i],
                highlightedCellValue,
                handleValueInput,
                selectedCellIndex,
                setSelectedCellIndex 
            }
        )
    }

    return (<>{gridCells}</>)
}

export default Grid