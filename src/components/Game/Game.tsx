import styles from './game.module.css'
import Board from '@/components/Board/Board'
import Timer from '@/components/Timer/Timer'
import {
    selectGameMoves,
    selectGameRecord,
    // selectGameIsOver,
    gameSlice,
    useSelector,
    useDispatch,
    selectGamePairsLeft,
} from '@/lib/redux'
import { getRecordValue } from '@/lib/redux/slices/gameSlice/utils'

export default function Game() {
    // console.log('('========== render Game')
    const moves = useSelector(selectGameMoves)
    const record = useSelector(selectGameRecord)
    
    const pairsLeft = useSelector(selectGamePairsLeft)
    // const isOver = useSelector(selectGameIsOver)
    const dispatch = useDispatch()

    const shuffleButtonClickHandler = () => {
        dispatch(gameSlice.actions.shuffleCards())
    }

    return (<>
        <button className={styles.shuffleButton} onClick={shuffleButtonClickHandler}>Shuffle</button>
        <div className={`${styles.infobox} ${styles.upperInfobox}`}>
            <span><h4>Pairs left:</h4> {pairsLeft}</span>
            <span><h4>Time left:</h4><Timer/></span>
        </div>
        <div className={styles.boardWrap}>
            <Board />
        </div>
        <div className={styles.infobox}>
            <span><h4>Moves:</h4> {moves}</span>
            <span><h4>Record:</h4> {getRecordValue(record)}</span>
        </div>
    </>)
}
