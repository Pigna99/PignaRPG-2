import {React, useState, useEffect, createContext, useContext} from 'react'
import { N, M } from '../CONSTANTS'
import { newMatrix } from '../utils'
import {enemyMovement } from '../utilsCombat'

import { useBoardContext } from './boardContext'

const EnemyContext = createContext()
const EnemyProvider = ({children})=>{//for all enemies!
    const {matrix, activeEntity, entities, entitiesMatrix, entitiesPos,
        movementMatrix, attackMatrix, setMovementMatrix, setAttackMatrix,
        changeEntityPos
    } = useBoardContext()
    


    const enemyMove = ()=>{
        if(entities[activeEntity.id].static.ai === "heavy"){//heavy AI movement
            let steps = enemyMovement(entities, entitiesPos[activeEntity.id], entitiesMatrix, matrix, entitiesPos);
            let matrixapp = newMatrix(N,M,0);
            let maxMov = entities[activeEntity.id].stats.movement;
            steps.forEach((element, index) => {
                if(steps.length-2-index<maxMov){
                    maxMov--;
                    setTimeout(()=>{
                        changeEntityPos(element[0],element[1],activeEntity.id)
                    },((steps.length-index-1) * 300))
                }
            });
            steps.pop();
            steps.forEach((el) => {
                matrixapp[el[1]][el[0]]=1;
            })
            


            setMovementMatrix(matrixapp);
            
            

        }
    }

    const enemyAttack = ()=>{
        if(entities[activeEntity.id].static.ai === "heavy"){//heavy AI attack
            
        }
    }


    useEffect(()=>{
        if(activeEntity.team==="b"){
            //turn of the enemy!
            //console.log(entities[activeEntity.id])
            enemyMove();
            // enemyAttack();
            // enemyMove();

        }
    },[activeEntity])


    return(<EnemyContext.Provider value={{}}>
        {children}
    </EnemyContext.Provider>)
}


const useEnemyContext = ()=>{
    return useContext(EnemyContext)
}

export {useEnemyContext, EnemyProvider}