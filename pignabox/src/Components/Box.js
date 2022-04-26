import React from 'react'
import { useGlobalContext } from '../context'
import {useCameraContext, usePlayerContext} from "../contexts"

import plain from '../img/plain.png'
import sand from '../img/sand.png'
import water from '../img/water.png'


//1 - plain
//2 - sand
//3 - water
//4 - tree

function Box({children, xindex, yindex, value}) {
    const {DEBUG} = useGlobalContext()
    const {handleClick, handleHoverMouse, playerStatus, movementMatrix, mouseHover} = usePlayerContext()
  return (
    <div className='box' id={xindex+"-"+yindex} onClick={()=>(movementMatrix[yindex][xindex]>0 ? handleClick(xindex, yindex):"")}
    onMouseEnter={()=>(handleHoverMouse(xindex,yindex))}  
    style={{backgroundImage:`url(${
        value ==1 ? plain :
        value ==2 ? sand :
        value ==3 ? water :
        value ==4 ? plain :
        ""
      })`,
      cursor: (movementMatrix[yindex][xindex]>0 && playerStatus=== "READY" ? "pointer" : "default")
    }}
    >
      {DEBUG ? value : ""}
      {children}
      {
        
        <div className='reachable' style={{
          transition:`all ${0.8/(movementMatrix[yindex][xindex])}s`,
          backgroundColor:`rgba(255, 0, 0, ${0.6})`,
          opacity: 
          (movementMatrix[yindex][xindex]>0 && playerStatus=="READY")
          // ( mouseHover[1] <= yindex+1 && mouseHover[1] >=yindex-1 && mouseHover[0] <= xindex+1 && mouseHover[0] >= xindex-1)
          ? 1 : 0
        }}/>

      }
    </div>
  )
}

export default Box