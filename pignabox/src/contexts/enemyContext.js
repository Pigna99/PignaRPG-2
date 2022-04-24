import {React, useState, useEffect, createContext, useContext} from 'react'
import { N, M } from '../CONSTANTS'
import {getEnemyPos} from '../utils'

import { useBoardContext } from './boardContext'

const EnemyContext = createContext()
const EnemyProvider = ({children})=>{//for all enemies!
    const {matrix, activeEntity, entities,entitiesMatrix, setEntity} = useBoardContext()
    

    const [enemies, setEnemies] = useState([]);

    useEffect(()=>{
        let enemy_pos=[];
        entities.forEach((element,index) => {
            if(element.team==="b"){//is an enemy!
                let pos = getEnemyPos(N,M, matrix, entitiesMatrix, enemy_pos);
                //console.log(entitiesMatrix)
                //enemies in the same position
                enemy_pos.push({xpos:pos.y,ypos:pos.x, id:element.id, type_id:element.type_id})
            }
        });
        setEnemies(enemy_pos);
    },[entities])

    useEffect(()=>{
        console.log(enemies)
        enemies.forEach(el=>{
            setEntity(el.xpos, el.ypos, el.id)
        })
    }, [enemies])


    return(<EnemyContext.Provider value={{enemies}}>
        {children}
    </EnemyContext.Provider>)
}


const useEnemyContext = ()=>{
    return useContext(EnemyContext)
}

export {useEnemyContext, EnemyProvider}