import {React, useState, useEffect, createContext, useContext} from 'react'
import {newMatrix, generateContinent, generatePrioQueue, nextTurn, generateEntitiesMatrix} from '../utils'
import { N, M , PRIO_QUEUE_LENGTH} from '../CONSTANTS'
import { generateCombatEntities } from '../utilsCombat'
import { listAllies } from '../assets'

const EX_entities = generateCombatEntities(listAllies, [0,0,0])

//team "a" / player and allies
//team "b" / enemies

const BoardContext = createContext()
const BoardProvider = ({children})=>{
    //board
    const [matrix, setMatrix] = useState([]) //board matrix for bioma
    //board

    //priority
    const [prioEntities, setPrioEntities] = useState([]); //list of the entities and their last turn (pointers) (POSITION)
    const [prioQueue, setPrioQueue] = useState([]); //queue for turns
    const [activeEntity, setActiveEntity] = useState({}); //active entity
    //priority

    //entities

    const [entities, setEntities] = useState([]); //list of the entities
    const [entitiesPos, setEntitiesPos] = useState([]); //list of the entities POSITIONS
    const [entitiesMatrix, setEntitiesMatrix] = useState([]) //matrix of the position of each entity on the board(id)
    //entities


    const hitAllTest = ()=>{
        let appentities = entities.slice();
        
        appentities.forEach((entity)=>{
            entity.stats.hp -= 10;
        })
        setEntities(appentities)
    }

    const changeEntityPos = (x,y,id)=>{
        let entrex = entitiesPos.slice();
        let entity = entrex[id];
        //set 0 in prev position
        let mat = entitiesMatrix.slice();
            mat[entity.ypos][entity.xpos]= -1;
            mat[y][x] = id;
        entrex[id].xpos = x;
        entrex[id].ypos = y;
        setEntitiesPos(entrex);
        setEntitiesMatrix(mat);
    }
    

    const setNextTurn= ()=>{//function that generate the prio queue dinamicaly after each turn end
        let prioInfo = nextTurn(prioQueue.slice(), prioEntities.slice());
        setPrioQueue(prioInfo[0]);
        setActiveEntity(prioInfo[0][0]);
        setPrioEntities(prioInfo[1]);
    }

    
    useEffect(()=>{ //init
        let initmatrix = newMatrix(N,M,1)
        let boardmatrix = generateContinent(initmatrix, N, M)
        setMatrix(boardmatrix)//init board matrix
        //inizialize entity matrix to null
        //generate here also the entities matrix!
    },[])

    useEffect(()=>{
        //console.log(entitiesPos)
        //console.log(entities)
        //console.log(prioQueue)
        //console.log(entitiesMatrix)
        //console.log(activeEntity)
    },[])

    
    useEffect(()=>{
        if(matrix.length>0){//when matrix is initialized, set the EntitiesMatrix
            setEntities(EX_entities)//init entities
            let entities_output = generateEntitiesMatrix(N, M, EX_entities, matrix);//for positioning of entities
            setEntitiesMatrix(entities_output[0]);
            setEntitiesPos(entities_output[1])// set also the correct position of each entity
            let prioInfo =generatePrioQueue(EX_entities, PRIO_QUEUE_LENGTH); //generate prio queue for entities
            setPrioQueue(prioInfo[0]);
            setActiveEntity(prioInfo[0][0]);
            setPrioEntities(prioInfo[1]);
        }
    },[matrix])//after generating the board matrix
    
    return(
        <BoardContext.Provider value={{
            matrix, prioQueue, setNextTurn, activeEntity, entities, entitiesMatrix,
            changeEntityPos, entitiesPos, hitAllTest
        }}>
            {children}
        </BoardContext.Provider>
    )
}

const useBoardContext = ()=>{
    return useContext(BoardContext)
}


export {useBoardContext, BoardProvider}