import React from 'react'
import {useCameraContext} from "../contexts"
import shadowimg from '../img/shadow.png'
const DIM= 104;

function Prop({img, xpos, ypos, className, onKeyDown, id, clickPropFunction}) {
    const {perspective, rotationFull} = useCameraContext()
  return (
    <div 
        onKeyDown={onKeyDown}
        tabIndex={0}
        className={"prop "+ className}
        id={id}
        onClick={clickPropFunction}
        style={{
            left:(DIM*xpos),
            top:(DIM*ypos),
            width:104, height:104, transition:"all 0.3s",
            display:"flex", justifyContent:"center", alignItems:"center"
        }}
    >
        {
            !perspective ?
            <>
                <img src={img} draggable={false} className="imgplayer"
                    style={{
                        transform: `rotateX(-90deg) rotateY(${rotationFull.z}deg)`,
                    }}
                />
                <img src={shadowimg} draggable={false}/>
            </>
            :   <img src={img} draggable={false} className="imgplayertop"/>

        }
        
    </div>
  )
}

export default Prop