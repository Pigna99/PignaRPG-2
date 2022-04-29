import React from 'react'
import { useBoardContext, useCameraContext, usePlayerContext } from '../contexts'
import {DIM} from '../CONSTANTS'

function Pointer() {
    const {perspective} = useCameraContext();
    const {entitiesPos, activeEntity} = useBoardContext();
    const {playerStatus} = usePlayerContext();
    let xpos = 0;
    let ypos = 0;
    //select the entity
    if(activeEntity.team=== "a"){
      xpos = entitiesPos[activeEntity.id].xpos
      ypos = entitiesPos[activeEntity.id].ypos
    }


    return (
        <>
        {
        playerStatus === "READY" ?
        !perspective ?
        <div style={{
        position:"absolute",
        left:(DIM*xpos), top:(DIM*ypos), width:DIM, height:DIM, transition:"all 0.3s",
        display:"flex", justifyContent:"center", alignItems:"center",transformStyle:"preserve-3d",
        animationName:(
          playerStatus==="READY" ? "pointer_ready":""
        )
        }} id={"pointer"}>
            <PointerObject/>
        </div>
        : <FlatPointer xpos={xpos} ypos={ypos}/> : ""
        }
        </>
    )
  }
  
  function FlatPointer({xpos, ypos, animation}){
    return(
      <div style={{
        position:"absolute",
        left:(DIM*xpos), top:(DIM*ypos), width:DIM, height:DIM, transition:"all 0.3s",
        display:"flex", justifyContent:"center", alignItems:"center",transformStyle:"preserve-3d",
      }} id={"pointer"}>
        <div className="flatpointer"/>
      </div>
    )
  }
  
  function PointerObject(){
    const {rotationFull} = useCameraContext();
  return (
    <>  
      <div className="triangle" style={{
            transform: `rotateX(90deg) rotateY(${-rotationFull.z}deg)`,
        }}/>
      <div className='circle'/>
    </>
  )
  }

export default Pointer