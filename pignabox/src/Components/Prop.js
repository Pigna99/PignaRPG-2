import React from 'react'
import {useBoardContext, useCameraContext} from "../contexts"
import shadowimg from '../img/shadow.png'
import { DIM } from '../CONSTANTS';
//ALL IMAGES FROM PROPS (get from another file?)

import playerimg from '../img/ralsei.webp'
import frog from '../img/frog.png'
import tree from '../img/tree.png'

//-------------





function Prop({xpos, ypos, className, onKeyDown, id, clickPropFunction, children, type_id, entity_id}) {
    const {perspective, rotationFull} = useCameraContext()
    const {activeEntity} = useBoardContext()
    let img = "";
    //console.log(type_id)
    switch (type_id) {
        case 0:
            img = playerimg;
            break;
        case 1:
            img = frog;
            break;
        case 2:
            img = tree;
            break;
        default:
            break;
    }


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