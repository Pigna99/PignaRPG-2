import React from 'react'
import Prop from './Prop';
import {useBoardContext, usePlayerContext} from "../contexts"

function Player() {
    
    const {setPlayerReady} = usePlayerContext()
    const {entities, entitiesPos} = useBoardContext()

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
        </Prop>)
      })
      }
    </>
  )
}

export default Player