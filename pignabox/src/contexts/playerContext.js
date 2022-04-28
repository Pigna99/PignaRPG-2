import {React, useState, useEffect, createContext, useContext} from 'react'
import { N, M } from '../CONSTANTS'
import {newMatrix, generateMovementMatrix} from '../utils'
import {generateAttackMatrix} from '../utilsCombat'
import {useBoardContext} from './boardContext'


let playerInit = {
    xpos:0,
    ypos:0,
}

let MOVEMENT = 3;

const PlayerContext = createContext()
const PlayerProvider = ({children})=>{
    
    const {
        matrix, activeEntity, entitiesMatrix , entities, entitiesPos, changeEntityPos,
        hitEntity,
    } = useBoardContext()

    //player

    const [activePlayer, setActivePlayer] = useState(-1);
    const [playerMovement, setPlayerMovement] = useState(0)

    const [playerStatus, setPlayerStatus] = useState("WAIT") //player status
    const [playerMove, setPlayerMove] = useState("MOVE");
    const [isPlayerMoveDone, setIsPlayerMoveDone] = useState(false);

    const [movementMatrix, setMovementMatrix] = useState(newMatrix(N,M,0))
    const [attackMatrix, setAttackMatrix] = useState(newMatrix(N,M,0))
    //PS LIST
    //READY
    //WAIT

    //mouse handle
    const [mouseHover, setMouseHover] = useState([]);

    //mouse handle

    const setPlayerWait = ()=>{
        setPlayerStatus("WAIT")
    }

    const setPlayerReady = (id)=>{
        if(activeEntity.team==="a" && activeEntity.id ===id){
            setPlayerStatus("READY")
        }
    }

    const changePlayerStatus = (ps)=>{
        setPlayerStatus(ps)
    }

    //player moves
    const setPlayerMoving = ()=>{
        setPlayerMove("MOVE")
    }
    const setPlayerAttack = ()=>{
        setPlayerMove("ATTACK")
    }

    //attack
    const handleAttack=(x,y)=>{
        console.log("attacK!")
    }

    const handleAttackEnemy = (enemy_id)=>{
        if(playerMove==="ATTACK"){
            let x=entitiesPos[enemy_id].xpos
            let y=entitiesPos[enemy_id].ypos
            if(attackMatrix[y][x]===2){//enemy attacked, is an enemy!
                //console.log(entities[enemy_id])
                hitEntity(enemy_id, entities[activeEntity.id].stats.strenght)
                setAttackMatrix(newMatrix(N,M,0)) //reset Attack matrix to 0 after attack
                setIsPlayerMoveDone(true)
            }
            
        }
        
    }
    //attack
    //player moves


    
    
    //player

    const handleClick= (x,y)=>{
        if(isTraversable(x,y) && playerStatus==="READY"){//the props are escluded by the movement matrix
            setPlayerMovement(movementMatrix[y][x]-1)
            changeEntityPos(x,y,activeEntity.id)
        }
    }

    const handleHoverMouse= (x,y)=>{
        setMouseHover([x,y]);
    }

    useEffect(()=>{
        //console.log(attackMatrix)
    },[attackMatrix])

    useEffect(()=>{
        //console.log(playerMove)
        if(playerMove==="ATTACK" && !isPlayerMoveDone){
            setAttackMatrix(generateAttackMatrix(N,M,matrix, entitiesMatrix, entitiesPos[activeEntity.id], entities, entities[activeEntity.id].weapon_type));
        }
    },[playerMove])

    useEffect(()=>{//set the active pg (ally team)
        if(activeEntity.team === "a" && entitiesMatrix.length>0){
            setIsPlayerMoveDone(false)
            setPlayerMovement(entities[activeEntity.id].stats.movement);//set movement
            setActivePlayer(activeEntity.id)//for pointer and other
            setPlayerStatus("READY");
            setPlayerMove("MOVE")
        }else{
            setPlayerStatus("WAIT")
        }
    },[activeEntity])//when the entity change


    useEffect(()=>{
        if(activeEntity.team === "a" && entitiesMatrix.length>0){
            let initmovementMatrix = generateMovementMatrix(N,M,matrix, entitiesMatrix, entitiesPos[activeEntity.id], playerMovement);
            setMovementMatrix(initmovementMatrix);
            //console.log(initmovementMatrix)
        }
    },[playerMovement, activeEntity])

    let isTraversable = (x,y)=>{//for access to matrix, reverse x and y coords (ty javascript)
        //console.log(x,y,matrix[y][x])
        if(matrix[y][x]===1 || matrix[y][x]===2){
            return true
        }else{
            return false
        }
    }

    return(
        <PlayerContext.Provider value={{
            setPlayerWait, setPlayerReady, changePlayerStatus, handleClick,
            playerStatus, movementMatrix, activePlayer, handleHoverMouse,
            mouseHover, playerMove, setPlayerAttack, setPlayerMoving, attackMatrix,
            handleAttack, handleAttackEnemy
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

const usePlayerContext = ()=>{
    return useContext(PlayerContext)
}

export {usePlayerContext, PlayerProvider}