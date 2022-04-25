import {React, useState, useEffect, createContext, useContext} from 'react'
import { N, M } from '../CONSTANTS'
import {getEnemyPos} from '../utils'

import { useBoardContext } from './boardContext'

const EnemyContext = createContext()
const EnemyProvider = ({children})=>{//for all enemies!
    const {matrix, activeEntity, entities,entitiesMatrix, setEntity} = useBoardContext()
    


    return(<EnemyContext.Provider value={{}}>
        {children}
    </EnemyContext.Provider>)
}


const useEnemyContext = ()=>{
    return useContext(EnemyContext)
}

export {useEnemyContext, EnemyProvider}