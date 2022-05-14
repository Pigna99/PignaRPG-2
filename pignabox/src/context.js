import { createContext, useContext} from "react";
import {React, useState, useEffect} from 'react'
import useSound from 'use-sound';
import {generateCombatEntities } from "./utilsCombat";
import { sounds } from './sound';

import { listAllies } from "./assets";
import {DEBUG, N, M} from './CONSTANTS'


//console.log(listAccessories)




const AppContext = createContext()
const AppProvider = ({children})=>{
    
    //start Demo menu
    const [demo, setDemo] = useState("none");

    //start Demo menu

    //background ost
    const [playBattleTheme] = useSound(sounds.ost.battletheme, {volume:0.1})

    //background ost


    //settings menu
    const [isSettings, setIsSettings] = useState(false);
    //settings menu



    //allies
    //const [characters, setCharacters] = useState([]);
    //allies





    
    
    const toggleSettings = ()=>{
        setIsSettings(!isSettings);
    }

    useEffect(()=>{
        if(demo === "battle"){
            //playBattleTheme()
        }
    }, [demo])

    useEffect(()=>{
        generateCombatEntities(listAllies, [0,0,0])
    },[])

    return <AppContext.Provider value={{
        N, M, DEBUG,
        toggleSettings, isSettings,
        demo, setDemo}}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppProvider, useGlobalContext}