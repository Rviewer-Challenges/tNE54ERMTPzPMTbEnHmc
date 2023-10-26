'use client'

import styles from './layout.module.css'
import Link from 'next/link'
import { useEffect } from 'react'
import { selectGameRecords, selectGameRestored, useSelector, gameSlice } from '@/lib/redux'
import { useDispatch } from 'react-redux'


export default function Layout({ children, pageTitle, home }: {
    children: React.ReactNode, pageTitle: string, home?: boolean
}) {

    const records = useSelector(selectGameRecords)
    const restored = useSelector(selectGameRestored)

    const dispatch = useDispatch()

    useEffect(() => {
        if (restored) return

        const lastGameString = localStorage.getItem('lastGame')
        if (lastGameString) {
            dispatch(gameSlice.actions.restoreRecords(JSON.parse(lastGameString)))
        }
    }, []);

    useEffect(() => {
        const beforeUnloadHandler = () => {
            localStorage.setItem('lastGame', JSON.stringify(records))
        }

        window.addEventListener('beforeunload', beforeUnloadHandler)

        return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler)
        }
    }, [records, restored]);

    return (
        <main className={styles.main}>
            <h1>{pageTitle}</h1>
            {children}
            {!home && <Link className={styles.backToGameLink} href='/'>ᐊ Back to game</Link>}
        </main>
    )
}