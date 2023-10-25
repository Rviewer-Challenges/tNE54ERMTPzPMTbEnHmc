import { useEffect, useRef } from "react"
import { gameSlice } from "@/lib/redux"
import { useDispatch, useSelector } from "react-redux"
import { selectGameIsOver, selectGameCardsValues, selectGameTimeLeft } from '@/lib/redux'

export default function Timer() {
    // console.log('======= Timer')
    const isOver = useSelector(selectGameIsOver)
    const cardsValues = useSelector(selectGameCardsValues)
    const timeLeft = useSelector(selectGameTimeLeft)

    const endTimeStamp = useRef<number | null>(null),
        prevSecLeft = useRef<number | null>(null),
        animationFrame = useRef<number>(-1)

    const getTimeLeft = (sec: number) => {
        const minutes = String(Math.floor(sec / 60))
        const seconds = String(sec % 60)
        return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0')
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (isOver) {
            return
        }

        const tick = (timeStamp: number) => {
            if (!endTimeStamp.current) {
                endTimeStamp.current = timeStamp + timeLeft * 1000
            }
            if (endTimeStamp.current - timeStamp > 0) {
                const secLeft = Math.round((endTimeStamp.current - timeStamp) / 1000)
                if (secLeft !== prevSecLeft.current) {
                    dispatch(gameSlice.actions.setTimeLeft(secLeft))
                    prevSecLeft.current = secLeft
                }
                animationFrame.current = requestAnimationFrame(tick)
            } else {
                dispatch(gameSlice.actions.setGameOver())
            }
        }
        animationFrame.current = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(animationFrame.current)
            endTimeStamp.current = null
        }
    }, [isOver, cardsValues])

    return (
        <span>{getTimeLeft(timeLeft)}</span>
    )
}