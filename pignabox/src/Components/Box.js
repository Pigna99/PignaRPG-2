import React from 'react'
import { useGlobalContext } from '../context'
import Prop from './Prop'

import plain from '../img/plain.png'
import sand from '../img/sand.png'
import water from '../img/water.png'
import plaintree from '../img/plaintree.png'


//1 - plain
//2 - sand
//3 - water
//4 - tree

function Box({children, xindex, yindex, value}) {
    const {handleClick, DEBUG, perspective} = useGlobalContext()
  return (
    <div className='box' id={xindex+"-"+yindex} onClick={()=>handleClick(xindex, yindex)}
      style={{backgroundImage:`url(${
        value ==1 ? plain :
        value ==2 ? sand :
        value ==3 ? water :
        value ==4 && !perspective ? plaintree :
        value ==4 && perspective ? plain :
        ""
      })`}}
    >
      {DEBUG ? value : ""}
    </div>
  )
}

export default Box