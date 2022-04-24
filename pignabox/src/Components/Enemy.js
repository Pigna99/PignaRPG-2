import React from 'react'
import Prop from './Prop'
import frog from '../img/frog.png'

import { useEnemyContext } from '../contexts'

function Enemy() {
  const {enemies} = useEnemyContext()
  //console.log(enemies)
  return (
    <>
    {
      enemies.map((el, index)=>{
        return(
        <Prop className={'enemy'} 
          tabIndex={0} img={frog}  
          xpos={el.xpos} ypos={el.ypos}
          id = {`enemy-${el.id}-${el.xpos}-${el.ypos}`}
          key = {`enemy-${el.id}-${el.xpos}-${el.ypos}`}
        />)
      })
    }
    
    </>
  )
}

export default Enemy