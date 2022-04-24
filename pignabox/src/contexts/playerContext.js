import {React, useState, useEffect, createContext, useContext} from 'react'
import { N, M } from '../CONSTANTS'
import {newMatrix, generateMovementMatrix} from '../utils'

import {useGlobalContext} from '../context'
import {useBoardContext} from './boardContext'


let playerInit = {
    xpos:0,
    ypos:0,
}

let MOVEMENT = 3;

const PlayerContext = createContext()
const PlayerProvider = ({children})=>{
    
    const {matrix} = useBoardContext()

    //player
    const [player, setPlayer] = useState(playerInit) //player position
    const [playerStatus, setPlayerStatus] = useState("WAIT") //player status

    const [movementMatrix, setMovementMatrix] = useState(newMatrix(N,M,0))
    //PS LIST
    //READY
    //WAIT

    const setPlayerWait = ()=>{
        setPlayerStatus("WAIT")
    }

    const setPlayerReady = ()=>{
        setPlayerStatus("READY")
    }

    const changePlayerStatus = (ps)=>{
        setPlayerStatus(ps)
    }
    
    //player

    const handleClick= (x,y)=>{
        console.log(x,y)
        if(isTraversable(x,y) && playerStatus==="READY"){
            setPlayer({xpos:x,ypos:y,})//bug in coordinates
        }
    }

    const move= (e)=>{
        //console.log(e.key)
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
    let changePosition= (pos)=>{
        switch (pos) {
            case "R":
                if(player.xpos<M-1 && isTraversable(player.xpos+1, player.ypos)){
                    setPlayer({...player, xpos: player.xpos+1})
                }
                break;
            case "L":
                if(player.xpos>0 && isTraversable(player.xpos-1, player.ypos)){
                    setPlayer({...player, xpos: player.xpos-1})
                }
                break;
            case "D":
                if(player.ypos<N-1 && isTraversable(player.xpos, player.ypos+1)){
                    setPlayer({...player, ypos: player.ypos+1})
                }
                break;
            case "U":
                if(player.ypos>0 && isTraversable(player.xpos, player.ypos-1)){
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
           let initmovementMatrix = generateMovementMatrix(N,M,matrix, player, MOVEMENT);
            console.log(initmovementMatrix)
            //setMovementMatrix(generateMovementMatrix(N,M,matrix, player, MOVEMENT));
            setMovementMatrix(initmovementMatrix);
        }
    },[playerStatus])

    useEffect(()=>{
        //console.log(player.xpos, player.ypos)
        setMovementMatrix(generateMovementMatrix(N,M,matrix, player, MOVEMENT));
    },[player])


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