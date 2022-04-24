import Player from "./Player";
import Box from './Box'
import { useGlobalContext } from '../context'
import Side from "./Side";
import Prop from "./Prop";

import tree from '../img/tree.png'




function Board() {
    const {matrix, N, M, rotationFull} = useGlobalContext()
    
    //console.log(matrix)
    
    return (
    <div className='board' id="Board"
        style={{
            //transform: `rotate3d(3, 1, -2, ${rotation}deg)`,
            transform: `rotateX(${rotationFull.x}deg) rotateY(${rotationFull.y}deg) rotateZ(${rotationFull.z}deg)`,
            width: (N*104)
        }}
        >
        {matrix.map((row, i)=>{
            return(
                <div className='row' key={"row-"+i}>
                    {
                        row.map((el, j)=>{
                            return(
                                <Box xindex={i} yindex={j} key={i+"-"+j} value={el}></Box>
                            )
                        })
                    }
                
                </div>
                )
        })}

        <Player/>
        {
            matrix.map((row,i)=>row.map((el,j)=>{
                if(el==4){
                    return <Prop xpos={j} ypos={i} img={tree} key={`tree-${j}-${i}`}/>
                }
            }))
        }

        <Side side="bottom"/>
        <Side side="top"/>
        <Side side="left"/>
        <Side side="right"/>

    </div>
  )
}

export default Board