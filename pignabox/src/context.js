import { createContext, useContext} from "react";
import {React, useState, useEffect} from 'react'
import {newMatrix, generateContinent} from './utils'

const DEBUG = false;


const AppContext = createContext()

let playerInit = {
    xpos:0,
    ypos:0,
}

const AppProvider = ({children})=>{
    const N = 8
    const M = 8


    let initmatrix = newMatrix(N,M,1)
    let boardmatrix = generateContinent(initmatrix, N, M)

    //rotation
    const [scaling, setScaling] =useState(50);
    const [rotationFull, setRotationFull] = useState({x:60,y:0,z:310})
    const [zindex, setZindex] = useState(0);
    const [perspective, setPerspective] =useState(false);
    //rotation

    //board
    const [matrix, setMatrix] = useState(boardmatrix)
    const [player, setPlayer] = useState(playerInit)
    //board

    //settings menu
    const [isSettings, setIsSettings] = useState(false);

    //settings menu
    
    const toggleSettings = ()=>{
        setIsSettings(!isSettings);
    }

    const handleScaling= (event) =>{
        setScaling(event.target.value);
    }

    const handleZindex= (event) =>{
        setZindex(event.target.value);
    }

    const setPerspectiveUp= ()=>{
        setRotationFull({x:0,y:0,z:360});
        //setPerspective(true);
    }

    const setPerspectiveNormal= ()=>{
        setRotationFull({x:60,y:0,z:310});
        //setPerspective(false);
    }

    const setPerspectiveReverse= ()=>{
        setRotationFull({x:60,y:0,z:130});
        //setPerspective(false);
    }

    const handleClick= (x,y)=>{
        setPlayer({xpos:y,ypos:x,})//bug in coordinates
    }

    let handleRotationFullX = (event) =>{
        setRotationFull({...rotationFull, x:event.target.value});
    }
    let handleRotationFullY = (event) =>{
        setRotationFull({...rotationFull, y:event.target.value});
    }
    let handleRotationFullZ = (event) =>{
        setRotationFull({...rotationFull, z:event.target.value});
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
                if(player.xpos<M-1){
                    setPlayer({...player, xpos: player.xpos+1})
                }
                break;
            case "L":
                if(player.xpos>0){
                    setPlayer({...player, xpos: player.xpos-1})
                }
                break;
            case "D":
                if(player.ypos<N-1){
                    setPlayer({...player, ypos: player.ypos+1})
                }
                break;
            case "U":
                if(player.ypos>0){
                    setPlayer({...player, ypos: player.ypos-1})
                }
                break;
        
            default:
                console.log("ERRORE")
                break;
        }
    }
    

    useEffect(()=>{
        //console.log(player.xpos, player.ypos)
    },[player])

    useEffect(()=>{
        //console.log(scaling)
    },[scaling])

    useEffect(()=>{
        //console.log(rotationFull)
        if(rotationFull.x<20 || rotationFull.x>340){
            setPerspective(true)
        }else{
            setPerspective(false)
        }
    },[rotationFull])


    return <AppContext.Provider value={{matrix, player, move, N, M, handleClick
        ,setPerspectiveUp, perspective, setPerspectiveNormal, DEBUG,
        scaling, handleScaling, rotationFull, handleRotationFullX,handleRotationFullY,handleRotationFullZ,
        setPerspectiveReverse,handleZindex, zindex, toggleSettings, isSettings
        }}>
        {children}
    </AppContext.Provider>

}

const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppProvider, useGlobalContext}