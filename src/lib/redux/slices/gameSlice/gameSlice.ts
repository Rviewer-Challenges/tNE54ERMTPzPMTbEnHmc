import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { initRecords, getShuffledMatrix, getPairsCount } from './utils'

const defaultSize: number = 4
const defaultTimeLimit: number = 60

export const levels = [
  { title: 'easy', size: 4, dimensions: [[4, 4]] },
  { title: 'medium', size: 5, dimensions: [[5, 4], [4, 5]] },
  { title: 'difficult', size: 6, dimensions: [[6, 4], [4, 6]] },
]

interface SizeDimension {
  size: number,
  dimension: number[]
}

const initialState: GameSliceState = {
  restored: false,
  size: defaultSize,
  dimension: [defaultSize, defaultSize],
  records: initRecords(),
  isOver: false,
  moves: 0,
  cards: getShuffledMatrix([defaultSize, defaultSize]),
  openCardsCoords: [],
  pairsLeft: getPairsCount(defaultSize),
  timeLeft: defaultTimeLimit,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeSize: (state, action: PayloadAction<SizeDimension>) => {
      const { size, dimension } = action.payload
      state.size = size
      state.dimension = dimension
      gameSlice.caseReducers.shuffleCards(state)
    },

    shuffleCards: state => {
      state.isOver = false
      state.moves = 0
      state.cards = getShuffledMatrix(state.dimension)
      state.openCardsCoords = []
      state.pairsLeft = getPairsCount(state.size)
      state.timeLeft = defaultTimeLimit
    },

    setGameOver: state => {
      state.isOver = true
      const [rows, columns] = state.dimension
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          state.cards[i][j].open = true
        }
      }
    },

    setTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload
    },

    openCard: (state, action: PayloadAction<CardCoords>) => {
      const cardCoords = action.payload
      const { row, col } = cardCoords

      state.cards[row][col].open = true
      state.openCardsCoords.push(cardCoords)
    },

    checkMatch: (state) => {
      if (state.openCardsCoords.length < 2) return

      state.moves++
      const { row: openCard1Row, col: openCard1Col } = state.openCardsCoords[0]
      const { row: openCard2Row, col: openCard2Col } = state.openCardsCoords[1]

      if (state.cards[openCard1Row][openCard1Col].value === state.cards[openCard2Row][openCard2Col].value) {
        // bingo
        state.pairsLeft--
        if (state.pairsLeft === 0) {
          state.isOver = true
          gameSlice.caseReducers.setRecord(state, {
            type: 'gameSlice/setRecord',
            payload: state.moves
          })
        }
        state.openCardsCoords.forEach(cardCoords => {
          const { row, col } = cardCoords
          state.cards[row][col].solved = true
        })
      } else {
        // oops
        state.openCardsCoords.forEach(cardCoords => {
          const { row, col } = cardCoords
          state.cards[row][col].open = false
        })
      }
      state.openCardsCoords = []
    },

    setRecord: (state, action: PayloadAction<number>) => {
      const moves = action.payload
      const recordItem = state.records.find(el => el.size === state.size)
      if (!recordItem) return
      recordItem.games += 1
      recordItem.total += moves
      recordItem.average = recordItem.total / recordItem.games
      if (!recordItem.best || moves < recordItem.best) {
        recordItem.best = moves
      }
    },

    restoreRecords: (state, action: PayloadAction<Array<Record>>) => {
      state.restored = true
      state.records = action.payload
    },

    clearRecords: state => {
      state.records = initRecords()
    }
  },
})

/* Types */
export type RecordValue = undefined | number

export interface CardCoords {
  row: number,
  col: number
}

export interface Record {
  level: string,
  size: number,
  games: number,
  best: RecordValue,
  total: number,
  average: RecordValue,
}

export interface Card {
  value: string,
  open: boolean,
  solved: boolean
}

export interface GameSliceState {
  restored: boolean,
  size: number,
  dimension: number[],
  records: Record[],
  isOver: boolean,
  moves: number,
  cards: Card[][],
  openCardsCoords: CardCoords[],
  pairsLeft: number,
  timeLeft: number,
}


