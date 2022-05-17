import React from 'react'
import { useGlobalContext } from '../context'
import {useEnemyContext, usePlayerContext} from "../contexts"

import plain from '../img/plain32.png'
import sand from '../img/sand32.png'
import water from '../img/water32.png'


//1 - plain
//2 - sand
//3 - water
//4 - tree

function Box({children, xindex, yindex, value}) {
    const {DEBUG} = useGlobalContext()
    const {handleClick, handleHoverMouse, playerStatus, playerMove, movementMatrix, attackMatrix, handleAttack} = usePlayerContext()
  return (
    <div className='box' id={xindex+"-"+yindex}
      onClick={()=>(
        movementMatrix[yindex][xindex]>0 && playerMove==="MOVE" ? handleClick(xindex, yindex):
        attackMatrix[yindex][xindex]>0 && playerMove==="ATTACK" ? handleAttack(xindex,yindex):
        ""
        )}
    onMouseEnter={()=>(handleHoverMouse(xindex,yindex))}  //not used
    style={{backgroundImage:`url(${
        value ===1 ? plain :
        value ===2 ? sand :
        value ===3 ? water :
        value ===4 ? plain :
        ""
      })`,
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      imageRendering:"pixelated",
      cursor: (
        (movementMatrix[yindex][xindex]>0 && playerStatus=== "READY" && playerMove==="MOVE") ||
        (attackMatrix[yindex][xindex]>0 && playerMove==="ATTACK")
      ? "pointer" : "default")
    }}
    >
      {DEBUG ? value : ""}
      {children}
      {
        
        <div className='reachable' style={{
          transition:
          (movementMatrix[yindex][xindex]>0 && playerStatus==="READY" && playerMove==="MOVE") ?
          `all ${0.8/(movementMatrix[yindex][xindex])}s` :
          (attackMatrix[yindex][xindex]>0 && playerStatus==="READY" && playerMove==="ATTACK")
          ?`all 0.3s`:"",
          backgroundColor:
          (movementMatrix[yindex][xindex]>0 && playerStatus==="READY" && playerMove==="MOVE") ?
          `rgba(255, 0, 0, ${0.6})` :
          (attackMatrix[yindex][xindex]===2 && playerStatus==="READY" && playerMove==="MOVE") ?
          `rgba(255, 0, 155, ${1})`:
          (attackMatrix[yindex][xindex]>0 && playerStatus==="READY" && playerMove==="ATTACK") ? 
            (
              attackMatrix[yindex][xindex]===1 ? `rgba(155, 0, 155, ${0.5})`: //not reachable
              attackMatrix[yindex][xindex]===2 ? `rgba(255, 0, 155, ${1})` : //reachable
              `rgba(155, 0, 155, ${0})`// ally
            ) : 
            (movementMatrix[yindex][xindex]>0) ? `rgba(255, 0, 0, ${0.1})` : //enemy movement debug
            "",
          
          opacity: 
          (movementMatrix[yindex][xindex]>0 && playerStatus==="READY" && playerMove==="MOVE") ||
          (attackMatrix[yindex][xindex]>0 && playerStatus==="READY")
          // ( mouseHover[1] <= yindex+1 && mouseHover[1] >=yindex-1 && mouseHover[0] <= xindex+1 && mouseHover[0] >= xindex-1)
          ? 1 : 1
        }}/>

      }
    </div>
  )
}

export default Box