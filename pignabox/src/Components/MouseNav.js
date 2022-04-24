import React from 'react'
import {useCameraContext} from "../contexts"

function MouseNav() {
    const {isCameraMoving,cameraMovingStart, movingOffset} = useCameraContext()

    //let offsetipo= (Math.abs(movingOffset[0])+Math.abs(movingOffset[1]))/5;//ipotenusa - size of moving pointer
    let offsetipo=100;
  return (
    <>
      {
      isCameraMoving ? <div style={{position:"absolute", left:cameraMovingStart[0]-5, top:cameraMovingStart[1]-5,
        width:10, height:10, backgroundColor:"", borderRadius:"50%", zIndex:5
        }}/> : <div className='testmouse'/>
      }

      {
      isCameraMoving ? <div style={{position:"absolute", left:cameraMovingStart[0]-offsetipo/2-movingOffset[0], top:cameraMovingStart[1]-offsetipo/2-movingOffset[1],
        width:offsetipo, height:offsetipo, backgroundColor:"", borderRadius:"50%", zIndex:5
        }}/> : <div className='testmouse'/>
      }
    </>
  )
}

export default MouseNav