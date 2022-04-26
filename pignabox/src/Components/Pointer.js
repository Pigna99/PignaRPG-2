import React from 'react'
import { useBoardContext, useCameraContext, usePlayerContext } from '../contexts'
import {DIM} from '../CONSTANTS'

function Pointer() {
    const {perspective} = useCameraContext();
    const {entities, entitiesPos} = useBoardContext();
    const {activePlayer , playerStatus} = usePlayerContext();
    let xpos = 0;
    let ypos = 0;
    //select the entity
    if(activePlayer!== -1){
      xpos = entitiesPos[activePlayer].xpos
      ypos = entitiesPos[activePlayer].ypos
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
        transform:"scale(0.5) translateZ(230px)",
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