import React from 'react'
import { useBoardContext } from '../contexts'
import { DEBUG } from '../CONSTANTS';

function TurnBox() {
    const {prioQueue} = useBoardContext()
    const first_queue= prioQueue.length!= 0 ? prioQueue[0].position : 0;
    const last_queue = prioQueue.length!= 0 ? prioQueue[9].position : 0;
    const normalize = (pos, displ)=>{
        return pos*(400/displ)
    }

  return (
    <div className='turnbox'>
        {
            prioQueue? 
            prioQueue.map((el,index)=><Turn 
            name={el.name} id={el.id} 
            displacement={normalize(el.position-first_queue, last_queue-first_queue)}
            key={`${el.id}-${el.position}`}
            row={index}
            />)
            :""
        }
    </div>
  )
}

function Turn({name, id , displacement, row}) {

    return(
        <div className='turn'
            style={{
                left:displacement/5,
                top:row*31,
                backgroundColor:row === 0 ? "red" : `rgb(10, ${180-displacement/2}, 80)`,
            }}
        >{DEBUG ? `${id}- ${displacement} ` : name}</div>
    )
}

export default TurnBox