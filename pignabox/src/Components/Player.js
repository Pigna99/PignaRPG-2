import React from 'react'
import Prop from './Prop';
import {useCameraContext, usePlayerContext} from "../contexts"
import playerimg from '../img/ralsei.webp'
const DIM= 104;

function Player() {
    
    const {perspective} = useCameraContext()
    const {player, move, playerStatus, setPlayerReady} = usePlayerContext()

  return (
    <>
      {
        playerStatus==="WAIT" ? "":
        perspective? <FlatPointer xpos={player.xpos} ypos={player.ypos}/> : 
        <Pointer xpos={player.xpos} ypos={player.ypos} animation={playerStatus}/>
      }
      <Prop className={'player'} onKeyDown={move}
      tabIndex={0} img={playerimg} 
      xpos={player.xpos} ypos={player.ypos}
      clickPropFunction={setPlayerReady}
      />
    </>
  )
}

function Pointer({xpos, ypos, animation}) {
  return (
    <div style={{
      position:"absolute",
      left:(DIM*xpos), top:(DIM*ypos), width:104, height:104, transition:"all 0.3s",
      display:"flex", justifyContent:"center", alignItems:"center",transformStyle:"preserve-3d",
      transform:"scale(0.5) translateZ(230px)",
      animationName:(
        animation==="READY" ? "pointer_ready":""
      )
      
    }} id={"pointer"}>
      <PointerObject/>
    </div>
  )
}

function FlatPointer({xpos, ypos, animation}){
  return(
    <div style={{
      position:"absolute",
      left:(DIM*xpos), top:(DIM*ypos), width:104, height:104, transition:"all 0.3s",
      display:"flex", justifyContent:"center", alignItems:"center",transformStyle:"preserve-3d",
    }} id={"pointer"}>
      <div className="flatpointer"/>
    </div>
  )
}

function PointerObject(){

return (
  <>  
    <div className="triangle triangle1"/>
    <div className="triangle triangle2"/>
    <div className='circle'/>
  </>
)
}

export default Player