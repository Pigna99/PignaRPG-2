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
    const {perspective} = useCameraContext()
    const {handleClick, playerStatus, movementMatrix} = usePlayerContext()
  return (
    <div className='box' id={xindex+"-"+yindex} onClick={()=>(movementMatrix[yindex][xindex]>0 ? handleClick(xindex, yindex):"")}
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
        movementMatrix[yindex][xindex]>0 && playerStatus=="READY"? 
        <div className='reachable'/>
        : ""
      }
    </div>
  )
}

export default Box