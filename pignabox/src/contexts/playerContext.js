import {React, useState, useEffect, createContext, useContext} from 'react'
import { N, M } from '../CONSTANTS'
import {newMatrix, generateMovementMatrix} from '../utils'
import {generateAttackMatrix, Dijkstra} from '../utilsCombat'
import {useBoardContext} from './boardContext'


const PlayerContext = createContext()
const PlayerProvider = ({children})=>{
    
    const {
        matrix, activeEntity, entitiesMatrix , entities, entitiesPos, changeEntityPos,
        hitEntity,
    } = useBoardContext()

    //player

    const [playerMovement, setPlayerMovement] = useState(0)//save the player movement remaining

    const [playerStatus, setPlayerStatus] = useState("WAIT") //player status
    const [playerMove, setPlayerMove] = useState("MOVE"); //what the player is doing
    const [isPlayerMoveDone, setIsPlayerMoveDone] = useState(false); //if the player has completed the move or not

    const [movementMatrix, setMovementMatrix] = useState(newMatrix(N,M,0))
    const [attackMatrix, setAttackMatrix] = useState(newMatrix(N,M,0))
    //PS LIST
    //READY
    //WAIT

    //mouse handle for hover, actually not used
    const [mouseHover, setMouseHover] = useState([]);

    //mouse handle for hover, actually not used

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
    const handleAttack=(x,y)=>{ //when you click on an attackbox
        console.log("attack!")
    }

    const handleAttackEnemy = (enemy_id)=>{//when you click on an attackable entity
        if(playerMove==="ATTACK"){
            let x=entitiesPos[enemy_id].xpos
            let y=entitiesPos[enemy_id].ypos
            if(attackMatrix[y][x]===2){//enemy attacked, is an enemy!
                //console.log(entities[enemy_id])
                hitEntity(enemy_id, entities[activeEntity.id].stats.strenght)
                setAttackMatrix(newMatrix(N,M,0)) //reset Attack matrix to 0 after attack

                //reset Also the MovementMatrix (if the enemy dies, now you can go!)
                let initmovementMatrix = generateMovementMatrix(N,M,matrix, entitiesMatrix, entitiesPos[activeEntity.id], playerMovement);
                setMovementMatrix(initmovementMatrix);
                //reset Also the MovementMatrix

                setIsPlayerMoveDone(true)
            }
            
        }
        
    }
    //attack
    //player moves


    
    
    //player

    const handleClick= (x,y)=>{//click on the movement active box
        if(isTraversable(x,y) && playerStatus==="READY"){//the props are escluded by the movement matrix
            
            let steps = Dijkstra(N,M, entitiesPos[activeEntity.id].xpos,  entitiesPos[activeEntity.id].ypos, x, y, movementMatrix)
            steps.pop();
            steps.forEach((element, index) => {
                setTimeout(()=>{
                    if(index === 0){
                        setPlayerMovement(movementMatrix[y][x]-1)
                    }
                    changeEntityPos(element[0],element[1],activeEntity.id)
                },((steps.length-index-1) * 300))
            });
            let matrixapp = newMatrix(N,M,0);
            steps.shift();
            steps.forEach((el) => {
                matrixapp[el[1]][el[0]]=1;
            })
            setMovementMatrix(matrixapp);
            
        }
    }

    const handleHoverMouse= (x,y)=>{
        setMouseHover([x,y]);
    }

    useEffect(()=>{
        //console.log(movementMatrix)
    },[movementMatrix])

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
        if(matrix[y][x]===1 || matrix[y][x]===2){
            return true
        }else{
            return false
        }
    }

    return(
        <PlayerContext.Provider value={{
            setPlayerWait, setPlayerReady, changePlayerStatus, handleClick,
            playerStatus, movementMatrix, handleHoverMouse,
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