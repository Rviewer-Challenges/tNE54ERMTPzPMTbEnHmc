'use client'

import Layout from '@/components/Layout/Layout'
import styles from './page.module.css'
import { selectGameRecords, selectGameRecordsExist, useSelector, useDispatch, gameSlice } from '@/lib/redux'
import { getRecordValue } from '@/lib/redux/slices/gameSlice/utils'

export default function Records() {
    const records = useSelector(selectGameRecords)
    const recordsExist = useSelector(selectGameRecordsExist)
    const dispatch = useDispatch()

    const clearButtonHandler = () => {
        dispatch(gameSlice.actions.clearRecords())
    }

    return (
        <Layout pageTitle="Records">
            <button 
                className={styles.clearButton} 
                onClick={clearButtonHandler}
                disabled={!recordsExist}>

                Clear
            </button>
            <table className={styles.recordTable}>
                <thead>
                    <tr>
                        <th className={styles.cellTitle}>Level</th>
                        <th className={styles.cellValue}>Best</th>
                        <th className={styles.cellValue}>Games</th>
                        <th className={styles.cellValue}>Average</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map(rec => {
                            return (
                                <tr className={styles.recordRow} key={rec.size}>
                                    <td className={styles.columnTitle}>
                                        {rec.level}
                                    </td>
                                    <td className={styles.columnValue}>
                                        {getRecordValue(rec.best)}
                                    </td>
                                    <td className={styles.columnValue}>
                                        {rec.games}
                                    </td>
                                    <td className={styles.columnValue}>
                                        {getRecordValue(rec.average, 1)}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Layout>
    )
}