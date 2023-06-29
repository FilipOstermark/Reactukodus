import styles from "./NumberSelection.module.css"


interface NumberSelectionProps {
  selectedCellIndex: number
  highlightedCellValue: string,
  handleValueInput: (index: number, value: string) => void
}

const NumberSelection: React.FC<NumberSelectionProps> = (
  {
    selectedCellIndex,
    highlightedCellValue,
    handleValueInput
  }: NumberSelectionProps
) => {

  function getStyle(value: string): string {
    if (value === highlightedCellValue) {
      return styles.selected
    }

    return styles.unselected
  }

  return (
    <div className='number-selection'>
      <div>
        <button className={getStyle("1")} onClick={() => handleValueInput(selectedCellIndex, "1")}>1</button>
        <button className={getStyle("2")} onClick={() => handleValueInput(selectedCellIndex, "2")}>2</button>
        <button className={getStyle("3")} onClick={() => handleValueInput(selectedCellIndex, "3")}>3</button>
        <button className={getStyle("4")} onClick={() => handleValueInput(selectedCellIndex, "4")}>4</button>
        <button className={getStyle("5")} onClick={() => handleValueInput(selectedCellIndex, "5")}>5</button>
      </div>
      <div>
        <button className={getStyle("6")} onClick={() => handleValueInput(selectedCellIndex, "6")}>6</button>
        <button className={getStyle("7")} onClick={() => handleValueInput(selectedCellIndex, "7")}>7</button>
        <button className={getStyle("8")} onClick={() => handleValueInput(selectedCellIndex, "8")}>8</button>
        <button className={getStyle("9")} onClick={() => handleValueInput(selectedCellIndex, "9")}>9</button>
        <button className={getStyle("-")} onClick={() => handleValueInput(selectedCellIndex, "-")}>-</button>
      </div>
    </div>
  )
}

export default NumberSelection