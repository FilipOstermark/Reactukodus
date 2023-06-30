export const GRID_CELL_INDEX_MIN = 0
export const GRID_CELL_INDEX_MAX = 80
export const GRID_SIZE = 9
export const GRID_NUM_CELLS = GRID_SIZE * GRID_SIZE

export const NO_CELL_SELECTED_INDEX = -1
export const EMPTY_CELL_VALUE = "-"

export const ALLOWED_CELL_VALUES = "123456789"
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
export const ARROW_KEY_INDEX_MODIFIERS: Map<string, number> = new Map([
  ['ArrowUp', -9],
  ['ArrowDown', +9],
  ['ArrowLeft', -1],
  ['ArrowRight', +1],
])
