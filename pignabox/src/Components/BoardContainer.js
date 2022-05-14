import React from 'react'
import Board from './Board'
import {useCameraContext} from "../contexts"

function BoardContainer() {
    const {scaling, movingAxes, handleCameraMovement  } = useCameraContext()
  return (
    <div className="boardcontainer" style={{
        perspective:3600,
        transform:`scale(${scaling/50})`,
        zIndex:1,
        position:"relative",
        top:`${movingAxes[1]}px`,
        left:`${movingAxes[0]}px`,
        transition: "all 0.1s linear"
        }}
        onMouseDown={handleCameraMovement}
        onContextMenu={(e)=>e.preventDefault()}
        >
        <Board/>
      
    </div>
  )
}

export default BoardContainer