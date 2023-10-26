import type { ReduxState } from '@/lib/redux'
import { levels } from '@/lib/redux'

export const selectGameSize = (state: ReduxState) => state.game.size
export const selectGameDimension = (state: ReduxState) => state.game.dimension
export const selectGameCards = (state: ReduxState) => state.game.cards
export const selectGameCardsValues = (state: ReduxState) => { return state.game.cards.flat().map(el => el.value).toString() }
export const selectGameIsCardsEnabled = (state: ReduxState) => state.game.openCardsCoords.length < 2
export const selectGameIsOver = (state: ReduxState) => state.game.isOver
export const selectGameMoves = (state: ReduxState) => state.game.moves
export const selectGamePairsLeft = (state: ReduxState) => state.game.pairsLeft
export const selectGameTimeLeft = (state: ReduxState) => state.game.timeLeft
export const selectGameRecord = (state: ReduxState) => { return (state.game.records?.find(el => el.size === state.game.size))?.best }
export const selectGameRecords = (state: ReduxState) => state.game.records
export const selectGameRestored = (state: ReduxState) => state.game.restored
export const selectLevel = (state: ReduxState) => {
    return levels.find(level => level.size === state.game.size)?.title
}
export const selectGameRecordsExist = (state: ReduxState) => { return state.game.records?.some(el => el.games > 0) }
