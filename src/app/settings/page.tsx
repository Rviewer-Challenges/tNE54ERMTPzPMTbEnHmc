'use client'
import Layout from '@/components/Layout/Layout'
import {
    useSelector, useDispatch, gameSlice, selectGameDimension,
} from '@/lib/redux'
import Link from 'next/link'

import styles from './page.module.css'
import { levels } from '@/lib/redux'

export default function Settings() {
    const dispatch = useDispatch()

    const [curGameRows, curGameColumns] = useSelector(selectGameDimension)

    const renderLevel = (title: string, size: number, dimensions: number[][]) => {

        const renderButton = (dimension: number[]) => {
            const [rows, columns] = dimension

            const selectSizeButtonHandler = () => {
                dispatch(gameSlice.actions.changeSize({ size, dimension }))
            }

            return (
                <Link href='/' key={`${rows}|${columns}`}>
                    <button
                        className={styles.selectSizeButton}
                        disabled={rows === curGameRows && columns === curGameColumns}
                        onClick={selectSizeButtonHandler}>

                        {rows} x {columns}
                    </button>
                </Link>
            )
        }

        return (
            <li className={styles.li} key={title}>
                <span>{title}:</span>
                {
                    dimensions.map(dimension =>
                        renderButton(dimension)
                    )
                }
            </li>)
    }


    return (
        <Layout pageTitle='Settings'>
            <ul>
                {
                    levels.map(({ title, size, dimensions }) => renderLevel(title, size, dimensions))
                }
            </ul>
        </Layout>
    )
}