import styles from './board.module.css'
import {
    selectGameCards,
    selectGameCardsValues,
    selectGameIsCardsEnabled,
    selectGameIsOver,
    CardCoords,
    gameSlice,
    useSelector, useDispatch,
} from '@/lib/redux'
import { useRef, useEffect } from 'react'

export default function Board() {
    // console.log('========== render Board')

    const cardsValues = useSelector(selectGameCardsValues)
    const cards = useSelector(selectGameCards)
    const cardsEnabled = useSelector(selectGameIsCardsEnabled)
    const isOver = useSelector(selectGameIsOver)

    const openCardsCount = useRef(0)
    const dispatch = useDispatch()

    useEffect(() => {
        openCardsCount.current = 0
    }, [cardsValues])

    const renderCard = (cardCoords: CardCoords, value: string, open: boolean, solved: boolean) => {
        const { row, col } = cardCoords
        const key = `${row}|${col}`
        const isClickPossible = !isOver && cardsEnabled

        const openCardHandler = () => {
            openCardsCount.current++
            dispatch(gameSlice.actions.openCard(cardCoords))
            if (openCardsCount.current === 2) {
                openCardsCount.current = 0
                setTimeout(() => {
                    dispatch(gameSlice.actions.checkMatch())
                }, 800)
            }
        }

        const className = solved ? styles.solved :
            open ? styles.framed : ''

        return <td key={key}>
            <button
                className={className}
                disabled={solved || !isClickPossible}
                onClick={open ? () => { } : openCardHandler}>

                {open ? value : ''}
            </button>
        </td>
    }

    return (<>
        <table className={styles.board}>
            <tbody>
                {
                    cards.map((row, rowIdx) => {
                        return (
                            <tr key={rowIdx}>
                                {
                                    row.map((el, colIdx) => renderCard({ row: rowIdx, col: colIdx }, el.value, el.open, el.solved))
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
    )
}
