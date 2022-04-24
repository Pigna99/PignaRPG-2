import {React, useState, useEffect, createContext, useContext} from 'react'
import {newMatrix, generateContinent, generatePrioQueue, nextTurn} from '../utils'
import { N, M , PRIO_QUEUE_LENGTH} from '../CONSTANTS'

const EX_entities = [
    {id:0, name:"player", speed:35, fortune: 20, team:"a"},
    {id:1, name:"enemy1", speed:15, fortune: 14, team:"b", type_id:1},
    {id:2, name:"enemy2", speed:17, fortune: 13, team:"b" , type_id:1},
    {id:3, name:"enemy3", speed:21, fortune: 21, team:"b" , type_id:1},
    {id:4, name:"enemy4", speed:8, fortune: 32, team:"b" , type_id:1},
    {id:5, name:"enemy5", speed:16, fortune: 12, team:"b" , type_id:1}
]

const BoardContext = createContext()
const BoardProvider = ({children})=>{
    let initmatrix = newMatrix(N,M,1)
    let boardmatrix = generateContinent(initmatrix, N, M)
    //board
    const [matrix, setMatrix] = useState(boardmatrix)
    //board

    //priority
    const [prioEntities, setPrioEntities] = useState([]);
    const [prioQueue, setPrioQueue] = useState([]);
    const [activeEntity, setActiveEntity] = useState({});
    //priority

    //entities

    const [entities, setEntities] = useState([]);
    const [entitiesMatrix, setEntitiesMatrix] = useState([])
    //entities

    const setEntity = (x,y, id)=>{
        if(entitiesMatrix.length>0){
            let mat = entitiesMatrix;
            mat[y][x]= id;
            //console.log(mat)
            setEntitiesMatrix(mat);
        }
    }
    

    const setNextTurn= ()=>{
        let prioInfo = nextTurn(prioQueue.slice(), prioEntities.slice());
        setPrioQueue(prioInfo[0]);
        setActiveEntity(prioInfo[0][0]);
        setPrioEntities(prioInfo[1]);
    }

    
    useEffect(()=>{
        setEntities(EX_entities)
        let prioInfo =generatePrioQueue(EX_entities, PRIO_QUEUE_LENGTH);
        setPrioQueue(prioInfo[0]);
        setActiveEntity(prioInfo[0][0]);
        setPrioEntities(prioInfo[1]);
        setEntitiesMatrix(newMatrix(N,M,-1))//inizialize entity matrix to null
    },[])

    useEffect(()=>{
        //console.log(prioEntities)
        //console.log(prioQueue)
        //console.log(entitiesMatrix)
    },[prioEntities, entitiesMatrix])

    
    // useEffect(()=>{
    //     console.log(matrix)
    // },[matrix])
    
    return(
        <BoardContext.Provider value={{
            matrix, prioQueue, setNextTurn, activeEntity, entities, entitiesMatrix, setEntity
        }}>
            {children}
        </BoardContext.Provider>
    )
}

const useBoardContext = ()=>{
    return useContext(BoardContext)
}


export {useBoardContext, BoardProvider}