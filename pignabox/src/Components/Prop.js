import React from 'react'
import { useGlobalContext } from '../context'
const DIM= 104;

function Prop({img, xpos, ypos, className, onKeyDown}) {
    const {perspective} = useGlobalContext()

  return (
    <div 
        onKeyDown={onKeyDown}
        tabIndex={0}
        className={"prop "+ className}
        style={{
            left:(DIM*xpos),
            top:(DIM*ypos)
        }}
    >
        {
            !perspective ?
            <>
                <img src={img} className="imgplayer imgplayer1"/>
                <img src={img} className="imgplayer imgplayer2"/>
            </>
            :   <img src={img} className="imgplayertop"/>

        }
        
    </div>
  )
}

export default Prop