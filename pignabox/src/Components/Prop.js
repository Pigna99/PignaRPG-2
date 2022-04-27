import React from 'react'
import {useBoardContext, useCameraContext} from "../contexts"
import shadowimg from '../img/shadow.png'
import { DIM } from '../CONSTANTS'
import {sprites} from '../assets/sprites'



function Prop({xpos, ypos, className, onKeyDown, id, clickPropFunction, children, type_id, entity_id}) {
    const {perspective, rotationFull} = useCameraContext()
    const {activeEntity} = useBoardContext()
    let img = sprites[type_id]; //take sprite from sprites.js

  return (
    <div 
        onKeyDown={onKeyDown}
        tabIndex={0}
        className="prop"
        id={id}
        onClick={clickPropFunction}
        style={{
            top:0,
            left:0,
            width:DIM, height:DIM, transition:"all 0.3s",
            display:"flex", justifyContent:"center", alignItems:"center",
            transform: `translateX(${xpos? +DIM*xpos : 0}px) translateY(${ypos? DIM*ypos : 0}px)`,
        }}
    >
        <div style={{
            position:"absolute",
            width:"90%", height:"90%", 
            backgroundColor:(activeEntity.team === "a" ? "rgb(0, 0, 255, 0.7)" : "rgb(255, 0, 0, 0.7)"),
            borderRadius:"50%", zIndex:-2,
            border:"2px solid white", opacity: (activeEntity.id === entity_id ? 0.7 : 0),
            transition:"all 0.3s"
        }}/>
        {
            !perspective ?
            <>
                <div className="imgpropcontainer"
                    style={{
                        transform: `rotateX(-90deg) rotateY(${rotationFull.z}deg)`,
                        transformStyle:"preserve-3d"
                    }}
                ><img src={img} draggable={false} className={"imgprop " + className} alt="prop"/>
                {children}</div>
                <img src={shadowimg} style={{width:"100%"}} draggable={false} alt="propshadow"/>
            </>
            :   <img src={img} draggable={false} className="imgplayertop" alt="proptop"/>

        }
    </div>
  )
}

export default Prop