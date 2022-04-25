import React from 'react'
import { useBoardContext } from '../contexts'
import { DEBUG } from '../CONSTANTS';

function TurnBox() {
    const {prioQueue,setNextTurn} = useBoardContext()
    const first_queue= prioQueue.length!= 0 ? prioQueue[0].position : 0;
    const last_queue = prioQueue.length!= 0 ? prioQueue[9].position : 0;
    const normalize = (pos, displ)=>{
        return pos*(400/displ)
    }

  return (
    <>
    <div className='turnbox'>
        {
            prioQueue? 
            prioQueue.map((el,index)=><Turn 
            name={el.name} id={el.id} 
            displacement={normalize(el.position-first_queue, last_queue-first_queue)}
            key={`${el.id}-${el.position}`}
            row={index} team={el.team}
            />)
            :""
        }
    </div>
    <button onClick={setNextTurn} style={{
        position:"absolute",
        top: 490,
        right: 40,
        zIndex:5
    }}>next turn</button>
    </>
  )
}

function Turn({name, id , displacement, row, team}) {

    return(
        <div className='turn'
            style={{
                left:displacement/5,
                top:row*31,
                backgroundColor:`rgb(${team==="a" ? 0 : 255}, ${20+displacement/2}, ${team==="a" ? 255 : 0})`,
                color: row===0 ? "yellow" : "white",
                fontSize: row===0 ? 20 : "",
                paddingTop:"0px"
            }}
        >{DEBUG ? `${id}- ${displacement} ` : name}</div>
    )
}

export default TurnBox