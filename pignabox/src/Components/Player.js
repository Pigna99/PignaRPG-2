import React from 'react'
import Prop from './Prop';
import {useBoardContext, useCameraContext, usePlayerContext} from "../contexts"

function Player() {
    const {rotationFull} = useCameraContext();
    const {setPlayerReady,playerStatus} = usePlayerContext()
    const {entities, entitiesPos, activeEntity} = useBoardContext()

  return (
    <>
      {
      entities.map((el)=>{
        if(el.team==="b"){return ""}//if enemy exit
        let xpos = entitiesPos.length>0 ? entitiesPos[el.id].xpos : 0
        let ypos = entitiesPos.length>0 ? entitiesPos[el.id].ypos : 0
        return(
        <Prop className={'player'}
          tabIndex={0} 
          xpos={xpos} ypos={ypos}
          id = {`ally-${el.id}`}
          key = {`ally-${el.id}`}
          clickPropFunction={()=>setPlayerReady(el.id)}
          type_id={el.type_id}
          entity_id={el.id}
        >
          <div className='infoplayer'
            style={{
              transform:`rotateX(${rotationFull.x}deg)`}}
            >
              {
                activeEntity.id === el.id && playerStatus === "READY" ?
                <ActionsBox/>
                :""
              }
            
            <InfoBox hp={el.stats.hp} hp_max={el.stats.hp_max}
              mp={el.stats.mp} mp_max={el.stats.mp_max}
            />
          </div>
        </Prop>)
      })
      }
    </>
  )
}

const ActionsBox = ()=>{
  const {playerMove, setPlayerAttack, setPlayerMoving} = usePlayerContext()
  return(
  <div style={{position:"absolute", width:"100%", top:-20, display:"flex"}}>
    {
      //set status and active one!
    }
    <button onClick={setPlayerMoving} style={{backgroundColor:playerMove === "MOVE" ? "red" : ""}}>muovi</button>
    <button onClick={setPlayerAttack} style={{backgroundColor:playerMove === "ATTACK" ? "red" : ""}}>attacca</button>
  </div>)
}

const InfoBox = ({hp, hp_max, mp, mp_max, status})=>{
  return(
    <div className='infobox'>
      <div className='healthbar'>
        <div style={{
          color:"black"
        }}
        >{`${hp} / ${hp_max}`}</div>
        <div style={{
          position:"absolute",
          width:`${(hp/hp_max)*100}%`, height:"18px", top:-2,
          backgroundColor:"red", zIndex:-1,
          transition:"all 0.3s"
        }}/>
      </div>
      <div className='mpbar'>
      <div style={{
          color:"black",
          position:"relative",
          bottom:-3
        }}
        >{`${mp} / ${mp_max}`}</div>
        <div style={{
          position:"absolute",
          width:`${(mp/mp_max)*100}%`, height:"18px", top:16,
          backgroundColor:"cyan", zIndex:-1,
          transition:"all 0.3s"
        }}/>
      </div>
    </div>
  )
}


export default Player