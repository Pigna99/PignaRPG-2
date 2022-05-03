import React from 'react'
import Prop from './Prop'

import { useBoardContext, useCameraContext, usePlayerContext } from '../contexts'

function Enemy() {
  const {entities, entitiesPos} = useBoardContext()
  const {rotationFull, perspective} = useCameraContext()
  const {handleAttackEnemy} = usePlayerContext()
  
  return (
    <>
    {
      entities.map((el, index)=>{
        if(el.team==="a"){return ""}
          let xpos = entitiesPos.length>0 ? entitiesPos[el.id].xpos : 0
          let ypos = entitiesPos.length>0 ? entitiesPos[el.id].ypos : 0
          if(!el.stats.down){

          
        return(
        <Prop className={'enemy'} 
          tabIndex={0}
          xpos={xpos} ypos={ypos}
          id = {`enemy-${el.id}`}
          key = {`enemy-${el.id}`}
          type_id={el.type_id}
          entity_id={el.id}
          clickPropFunction={()=>{handleAttackEnemy(el.id)}}
        >
          <div className='info' 
          style={{
            transform: !perspective ? `rotateX(${rotationFull.x}deg)` : "",
            bottom: perspective ? 80 : 140,
            left:0,
            zIndex:3
            
            }}><InfoBox name={el.name} hp={el.stats.hp} hp_max={el.stats.hp_max}/></div>
        </Prop>)}else{return("")}
      })
    }
    </>
  )
}

const InfoBox = ({name, hp, hp_max, status})=>{
  return(
    <div className='infobox'>
      <div style={{fontSize:30}}>{name}</div>
      
      <div className='healthbar'>
        <div style={{
          color:"black"
        }}
        >{`${hp} / ${hp_max}`}</div>
        <div style={{
          position:"absolute",
          width:`${(hp/hp_max)*100}%`, height:"18px", top:27,
          backgroundColor:"red", zIndex:-1,
          transition:"all 0.3s"
        }}/>
      </div>
    </div>
  )
}

export default Enemy