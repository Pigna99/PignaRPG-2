import {React, useState, useEffect, createContext, useContext} from 'react'
import { N, M } from '../CONSTANTS'
import {newMatrix, generateMovementMatrix} from '../utils'

import {useBoardContext} from './boardContext'


let playerInit = {
    xpos:0,
    ypos:0,
}

let MOVEMENT = 3;

const PlayerContext = createContext()
const PlayerProvider = ({children})=>{
    
    const {matrix, activeEntity, entitiesMatrix , entities, entitiesPos, changeEntityPos} = useBoardContext()

    //player

    const [activePlayer, setActivePlayer] = useState(-1);
    const [playerMovement, setPlayerMovement] = useState(0)

    const [playerStatus, setPlayerStatus] = useState("WAIT") //player status

    const [movementMatrix, setMovementMatrix] = useState(newMatrix(N,M,0))
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

    // const move= (e)=>{ //BROKEN
    //     //console.log(e.key)
    //     if(playerStatus==="READY" && playerMovement>0){
    //     switch (e.key) {
    //         case "d":
    //             changePosition("R")
    //             break;
    //         case "a":
    //             changePosition("L")
    //             break;
    //         case "s":
    //             changePosition("D")
    //             break;
    //         case "w":
    //             changePosition("U")
    //             break;
    //         default:
    //             break;
    //     }
    //     }
    // }
    // let changePosition= (pos)=>{
    //     setEntity(player.xpos, player.ypos, -1)
    //     switch (pos) {
    //         case "R":
    //             if(player.xpos<M-1 && isTraversable(player.xpos+1, player.ypos)){
    //                 setPlayerMovement(movementMatrix[player.ypos][player.xpos+1]-1)
    //                 setPlayer({...player, xpos: player.xpos+1})
    //             }
    //             break;
    //         case "L":
    //             if(player.xpos>0 && isTraversable(player.xpos-1, player.ypos)){
    //                 setPlayerMovement(movementMatrix[player.ypos][player.xpos-1]-1)
    //                 setPlayer({...player, xpos: player.xpos-1})
    //             }
    //             break;
    //         case "D":
    //             if(player.ypos<N-1 && isTraversable(player.xpos, player.ypos+1)){
    //                 setPlayerMovement(movementMatrix[player.ypos+1][player.xpos]-1)
    //                 setPlayer({...player, ypos: player.ypos+1})
    //             }
    //             break;
    //         case "U":
    //             if(player.ypos>0 && isTraversable(player.xpos, player.ypos-1)){
    //                 setPlayerMovement(movementMatrix[player.ypos-1][player.xpos]-1)
    //                 setPlayer({...player, ypos: player.ypos-1})
    //             }
    //             break;
        
    //         default:
    //             console.log("ERRORE")
    //             break;
    //     }
    // }


    useEffect(()=>{//set the active pg (ally team)
        if(activeEntity.team === "a" && entitiesMatrix.length>0){
            setPlayerMovement(entities[activeEntity.id].stats.movement);//set movement
            setActivePlayer(activeEntity.id)//for pointer and other
            setPlayerStatus("READY");
        }else{
            setPlayerStatus("WAIT")
        }
    },[activeEntity])//when the entity change


    useEffect(()=>{
        if(activeEntity.team === "a" && entitiesMatrix.length>0){
            let initmovementMatrix = generateMovementMatrix(N,M,matrix, entitiesMatrix, entitiesPos[activeEntity.id], playerMovement);
            setMovementMatrix(initmovementMatrix);
        }
    },[playerMovement, activeEntity])

    let isTraversable = (x,y)=>{//for access to matrix, reverse x and y coords (ty javascript)
        //console.log(x,y,matrix[y][x])
        if(matrix[y][x]==1 || matrix[y][x]==2){
            return true
        }else{
            return false
        }
    }

    return(
        <PlayerContext.Provider value={{
            setPlayerWait, setPlayerReady, changePlayerStatus, handleClick,
            playerStatus, movementMatrix, activePlayer, handleHoverMouse,
            mouseHover
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

const usePlayerContext = ()=>{
    return useContext(PlayerContext)
}

export {usePlayerContext, PlayerProvider}