import React from 'react'
import { useGlobalContext } from '../context'

function Side({side}) {
    const {N,M} = useGlobalContext();
  return (
    <div className='side' style={
        side === 'bottom' ? {position:"absolute",top:(104*N), transformOrigin: "top", height:100, width:(104*M -4), transform: "rotateX(-90deg)"} :
        side === 'top' ? {position:"absolute", top:0, transformOrigin: "top", height:100, width:(104*M -4), transform: "rotateX(-90deg)"} :
        side === 'left' ? {position:"absolute", top:0, left:0, transformOrigin: "left", height:(104*N -4), width:100, transform: "rotateY(90deg)"} :
        side === 'right' ? {position:"absolute", top:0, right:0, transformOrigin: "right", height:(104*N -4), width:100, transform: "rotateY(-90deg)"} :
        {}
    }></div>
  )
}

export default Side