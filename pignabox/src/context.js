import { createContext, useContext} from "react";
import {React, useState, useEffect} from 'react'
import {DEBUG, N, M} from './CONSTANTS'


const AppContext = createContext()
const AppProvider = ({children})=>{
    //settings menu
    const [isSettings, setIsSettings] = useState(false);
    //settings menu
    
    const toggleSettings = ()=>{
        setIsSettings(!isSettings);
    }



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