import React from 'react'
import {MdRotate90DegreesCcw} from 'react-icons/md'
import {BiPlus, BiMinus} from 'react-icons/bi'
import {useCameraContext} from "../contexts"

function Navigation() {
    const {rotateZ, handleZoom, isCameraMoving, cameraMovingStart} = useCameraContext()
  return (
    <div className='navigation'>
        <MdRotate90DegreesCcw className='navico rotateright' onClick={()=>rotateZ(-90)}/>
        <MdRotate90DegreesCcw className='navico rotateleft' onClick={()=>rotateZ(90)}/>
        <BiPlus className='navico zoomin' onClick={()=>{handleZoom("in")}}/>
        <BiMinus className='navico zoomout' onClick={()=>{handleZoom("out")}}/>
    </div>
  )
}

export default Navigation