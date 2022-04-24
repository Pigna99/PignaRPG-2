import React from 'react'
import {useCameraContext} from "../contexts"
import shadowimg from '../img/shadow.png'
const DIM= 104;

function Prop({img, xpos, ypos, className, onKeyDown, id, clickPropFunction, children}) {
    const {perspective, rotationFull} = useCameraContext()
  return (
    <div 
        onKeyDown={onKeyDown}
        tabIndex={0}
        className="prop"
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
                <div className="imgpropcontainer"
                    style={{
                        transform: `rotateX(-90deg) rotateY(${rotationFull.z}deg)`,
                    }}
                ><img src={img} draggable={false} className={"imgprop " + className}/>
                {children}</div>
                <img src={shadowimg} draggable={false}/>
            </>
            :   <img src={img} draggable={false} className="imgplayertop"/>

        }
        
    </div>
  )
}

export default Prop