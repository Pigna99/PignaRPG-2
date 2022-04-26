import { createContext, useContext} from "react";
import {React, useState, useEffect} from 'react'
import {generateCombatEntities } from "./utilsCombat";

import { listAllies } from "./assets";
import {DEBUG, N, M} from './CONSTANTS'


//console.log(listAccessories)




const AppContext = createContext()
const AppProvider = ({children})=>{
    
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
        generateCombatEntities(listAllies, [0,0,0])
    },[])

    return <AppContext.Provider value={{
        N, M, DEBUG,
        toggleSettings, isSettings}}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppProvider, useGlobalContext}