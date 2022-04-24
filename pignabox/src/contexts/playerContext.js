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
    
    const {matrix, activeEntity, entitiesMatrix, setEntity } = useBoardContext()

    //player
    const [player, setPlayer] = useState(playerInit) //player position
    const [playerMovement, setPlayerMovement] = useState(MOVEMENT)

    const [playerStatus, setPlayerStatus] = useState("WAIT") //player status

    const [movementMatrix, setMovementMatrix] = useState(newMatrix(N,M,0))
    //PS LIST
    //READY
    //WAIT

    const setPlayerWait = ()=>{
        setPlayerStatus("WAIT")
    }

    const setPlayerReady = ()=>{
        if(activeEntity.id===0){
            setPlayerStatus("READY")
        }
    }

    const changePlayerStatus = (ps)=>{
        setPlayerStatus(ps)
    }
    
    //player

    const handleClick= (x,y)=>{
        //console.log(x,y)
        if(isTraversable(x,y) && playerStatus==="READY"){
            console.log(movementMatrix[y][x]-1)
            setPlayerMovement(movementMatrix[y][x]-1)
            setEntity(player.xpos, player.ypos, -1)
            setPlayer({xpos:x,ypos:y,})
        }
    }

    const move= (e)=>{
        //console.log(e.key)
        if(playerStatus==="READY" && playerMovement>0){
        switch (e.key) {
            case "d":
                changePosition("R")
                break;
            case "a":
                changePosition("L")
                break;
            case "s":
                changePosition("D")
                break;
            case "w":
                changePosition("U")
                break;
            default:
                break;
        }
        }
    }
    let changePosition= (pos)=>{
        setEntity(player.xpos, player.ypos, -1)
        switch (pos) {
            case "R":
                if(player.xpos<M-1 && isTraversable(player.xpos+1, player.ypos)){
                    setPlayerMovement(movementMatrix[player.ypos][player.xpos+1]-1)
                    setPlayer({...player, xpos: player.xpos+1})
                }
                break;
            case "L":
                if(player.xpos>0 && isTraversable(player.xpos-1, player.ypos)){
                    setPlayerMovement(movementMatrix[player.ypos][player.xpos-1]-1)
                    setPlayer({...player, xpos: player.xpos-1})
                }
                break;
            case "D":
                if(player.ypos<N-1 && isTraversable(player.xpos, player.ypos+1)){
                    setPlayerMovement(movementMatrix[player.ypos+1][player.xpos]-1)
                    setPlayer({...player, ypos: player.ypos+1})
                }
                break;
            case "U":
                if(player.ypos>0 && isTraversable(player.xpos, player.ypos-1)){
                    setPlayerMovement(movementMatrix[player.ypos-1][player.xpos]-1)
                    setPlayer({...player, ypos: player.ypos-1})
                }
                break;
        
            default:
                console.log("ERRORE")
                break;
        }
    }


    useEffect(()=>{
        if(playerStatus==="READY"){
            
           let initmovementMatrix = generateMovementMatrix(N,M,matrix, entitiesMatrix, player, MOVEMENT);
            //console.log(initmovementMatrix)
            //setMovementMatrix(generateMovementMatrix(N,M,matrix, player, MOVEMENT));
            setMovementMatrix(initmovementMatrix);
        }
    },[playerStatus])

    useEffect(()=>{
        //console.log(player.xpos, player.ypos)
        if(entitiesMatrix.length>0){
            setMovementMatrix(generateMovementMatrix(N,M,matrix, entitiesMatrix, player, playerMovement));
        }

        console.log(player)
        setEntity(player.xpos, player.ypos, 0);
    },[player])

    useEffect(()=>{
        if(activeEntity.id===0){//Player has always id 0
            setPlayerStatus("READY")
            setPlayerMovement(MOVEMENT);
            setMovementMatrix(generateMovementMatrix(N,M, matrix, entitiesMatrix ,player, MOVEMENT));
        }else{
            setPlayerStatus("WAIT")
        }
    },[activeEntity])


    useEffect(()=>{
        setEntity(player.xpos, player.ypos, 0);
    },[entitiesMatrix])


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
            setPlayerWait, setPlayerReady, changePlayerStatus, handleClick, move,
            player ,playerStatus, movementMatrix,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

const usePlayerContext = ()=>{
    return useContext(PlayerContext)
}

export {usePlayerContext, PlayerProvider}