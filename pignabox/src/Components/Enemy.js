import React from 'react'
import Prop from './Prop'

import { useBoardContext } from '../contexts'

function Enemy() {
  const {entities} = useBoardContext()
  return (
    <>
    {
      entities.map((el, index)=>{
        if(el.team==="a"){return}
        return(
        <Prop className={'enemy'} 
          tabIndex={0}
          xpos={el.xpos} ypos={el.ypos}
          id = {`enemy-${el.id}`}
          key = {`enemy-${el.id}`}
          type_id={el.type_id}
          entity_id={el.id}
        >
          <div className='info'>{el.name}</div>
        </Prop>)
      })
    }
    
    </>
  )
}

export default Enemy