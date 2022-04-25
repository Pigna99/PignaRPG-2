import Player from "./Player";
import Pointer from "./Pointer";
import Box from './Box'
import { useGlobalContext } from '../context'
import { useBoardContext, useCameraContext } from "../contexts";
import Side from "./Side";
import Prop from "./Prop";
import Enemy from "./Enemy";

import tree from '../img/tree.png'




function Board() {
    const {N, M} = useGlobalContext()
    const {rotationFull} = useCameraContext()
    const {matrix} = useBoardContext()
    
    //console.log(matrix)
    
    return (
    <div className='board' id="Board"
        style={{
            //transform: `rotate3d(3, 1, -2, ${rotation}deg)`,
            transform: `rotateX(${rotationFull.x}deg) rotateY(${rotationFull.y}deg) rotateZ(${rotationFull.z}deg)`,
            width: (N*104)
        }}
        >
        {matrix ? matrix.map((row, i)=>{//row
            return(
                <div className='row' key={"row-"+i}>
                    {
                        row.map((el, j)=>{//column
                            return(
                                <Box xindex={j} yindex={i} key={j+"-"+i} value={el}></Box>
                            )
                        })
                    }
                
                </div>
                )
        }):""}

        <Player/>
        <Pointer/>
        <Enemy/>
        {
            matrix ?
            matrix.map((row,i)=>row.map((el,j)=>{
                if(el==4){
                    return <Prop xpos={j} ypos={i} type_id={2} key={`tree-${j}-${i}`} id={`tree-${j}-${i}`} className={"tree"}/>
                }
            })):""
        }

        <Side side="bottom"/>
        <Side side="top"/>
        <Side side="left"/>
        <Side side="right"/>

    </div>
  )
}

export default Board