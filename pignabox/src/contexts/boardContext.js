import {React, useState, useEffect, createContext, useContext} from 'react'
import {newMatrix, generateContinent} from '../utils'
import { N, M } from '../CONSTANTS'

const BoardContext = createContext()
const BoardProvider = ({children})=>{
    let initmatrix = newMatrix(N,M,1)
    let boardmatrix = generateContinent(initmatrix, N, M)
    //board
    const [matrix, setMatrix] = useState(boardmatrix)

    /*
    useEffect(()=>{
        console.log(matrix)
    },[matrix])
    */
    return(
        <BoardContext.Provider value={{
            matrix
        }}>
            {children}
        </BoardContext.Provider>
    )
}

const useBoardContext = ()=>{
    return useContext(BoardContext)
}


export {useBoardContext, BoardProvider}