import { Card, Record, RecordValue, levels } from './gameSlice'

const getShuffledMatrix = (dimension: number[]) => {

    const [rows, columns] = dimension

    let matrix = []
    let allowedIndexes: number[][] = []

    for (let i = 0; i < rows; i++) {
        let row: Card[] = []
        for (let j = 0; j < columns; j++) {
            row.push({
                value: '',
                open: false,
                solved: false
            })
            allowedIndexes.push([i, j])
        }
        matrix.push(row)
    }

    const pictures = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

    for (let p = 0; p < rows * columns / 2; p++) {
        for (let count = 0; count < 2; count++) {
            const randomIndex = Math.floor(Math.random() * allowedIndexes.length)

            matrix[allowedIndexes[randomIndex][0]][allowedIndexes[randomIndex][1]].value = pictures[p]
            allowedIndexes.splice(randomIndex, 1)
        }
    }

    // console.log(matrix)
    return matrix
}

const getBooleanMatrix = (size: number) => {
    let matrix = []
    for (let i = 0; i < size; i++) {
        let row = []
        for (let j = 0; j < size; j++) {
            row.push(true)
        }
        matrix.push(row)
    }
    return matrix
}

const getRecordValue = (value: RecordValue, fixed = 0) => {
    return value ? value.toFixed(fixed) : 'unset'
}

const initRecords = (): Array<Record> => {
    return levels.map(({ title, size }) => {
        return {
            level: title,
            size,
            best: undefined,
            games: 0,
            total: 0,
            average: undefined
        }
    })
}

const getPairsCount = (size: number) => {
    return 4 * size / 2
}

export {
    initRecords,
    getShuffledMatrix,
    getBooleanMatrix,
    getRecordValue,
    getPairsCount
}

