import { Observable, BehaviorSubject } from "rxjs"
import { EMPTY_CELL_VALUE, NO_CELL_SELECTED_INDEX } from "../common/global-constants"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"

export interface GameControlRepository {
  isNotesMode: () => boolean
  isNotesMode$: () => Observable<boolean>
  setNotesMode: (value: boolean) => void
  
  isViewingHighscore: () => boolean
  isViewingHighscore$: () => Observable<boolean>
  setViewingHighscore: (value: boolean) => void

  highscoreViewDifficulty: () => Difficulty
  highscoreViewDifficulty$: () => Observable<Difficulty>
  setHighscoreViewDifficulty: (value: Difficulty) => void

  selectedCellIndex: () => number
  selectedCellIndex$: () => Observable<number>
  setSelectedCellIndex: (value: number) => void

  highlightedCellValue: () => string
  highlightedCellValue$: () => Observable<string>
  setHighlightedCellValue: (value: string) => void
}

class GameControlRepositoryImpl implements GameControlRepository {

  private _isNotesMode: BehaviorSubject<boolean>
  private _isViewingHighscore: BehaviorSubject<boolean>
  private _highscoreViewDifficulty: BehaviorSubject<Difficulty>
  private _selectedCellIndex: BehaviorSubject<number>
  private _highlightedCellValue: BehaviorSubject<string>

  constructor() {
    this._isNotesMode = new BehaviorSubject(false)
    this._isViewingHighscore = new BehaviorSubject(false)
    this._highscoreViewDifficulty = new BehaviorSubject<Difficulty>('easy')
    this._selectedCellIndex = new BehaviorSubject(NO_CELL_SELECTED_INDEX)
    this._highlightedCellValue = new BehaviorSubject(EMPTY_CELL_VALUE)
  }

  
  public isNotesMode: () => boolean = () => {
    return this._isNotesMode.getValue()
  }

  public isNotesMode$: () => Observable<boolean> = () => {
    return this._isNotesMode.asObservable()
  }

  public setNotesMode: (value: boolean) => void = value => {
    this._isNotesMode.next(value)
  }

  public isViewingHighscore: () => boolean = () => {
    return this._isViewingHighscore.getValue()
  }

  public isViewingHighscore$: () => Observable<boolean> = () => {
    return this._isViewingHighscore.asObservable()
  }

  public setViewingHighscore: (value: boolean) => void = value => {
    this._isViewingHighscore.next(value)
  }

  public highscoreViewDifficulty: () => Difficulty = () => {
    return this._highscoreViewDifficulty.getValue()
  }

  public highscoreViewDifficulty$: () => Observable<Difficulty> = () => {
    return this._highscoreViewDifficulty.asObservable()
  }

  public setHighscoreViewDifficulty: (value: Difficulty) => void = value => {
    this._highscoreViewDifficulty.next(value)
  }

  public selectedCellIndex: () => number = () => {
    return this._selectedCellIndex.getValue()
  }
  
  public selectedCellIndex$: () => Observable<number> = () => {
    return this._selectedCellIndex.asObservable()
  }

  public setSelectedCellIndex: (value: number) => void = value => {
    this._selectedCellIndex.next(value)
  }

  public highlightedCellValue: () => string = () => {
    return this._highlightedCellValue.getValue()
  }

  public highlightedCellValue$: () => Observable<string> = () => {
    return this._highlightedCellValue.asObservable()
  }

  public setHighlightedCellValue: (value: string) => void = value => {
    this._highlightedCellValue.next(value)
  }
}

export const gameControlRepository: GameControlRepository = 
  new GameControlRepositoryImpl()
