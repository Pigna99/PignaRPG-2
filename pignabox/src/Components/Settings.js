import React from 'react'
import {useGlobalContext } from "../context";
import {useCameraContext} from "../contexts"


function SettingsWrapped() {
    const { setPerspectiveUp, setPerspectiveNormal, setPerspectiveReverse, scaling, handleScaling,
        rotationFull, handleRotationFullX,handleRotationFullY,handleRotationFullZ,
        zindex, handleZindex, setFullScreen
      } = useCameraContext()
    
    
  return (
    <div className="Settings" style={{display:"flex", flexFlow:"column", width:"200px", zIndex:3, position:"absolute"}}>
        <h4>Settings</h4>
        <input type={"range"} min={0} max={360} value={rotationFull.x} onChange={handleRotationFullX} />
        <input type={"range"} min={0} max={360} value={rotationFull.y} onChange={handleRotationFullY} />
        <input type={"range"} min={0} max={360} value={rotationFull.z} onChange={handleRotationFullZ} />
        <input type={"range"} min={-500} max={+500} value={zindex} onChange={handleZindex} />

        <input type={"range"} min={5} max={100} value={scaling} onChange={handleScaling} />
        <button onClick={setPerspectiveUp}>up</button>
        <button onClick={setPerspectiveNormal}>normal</button>
        <button onClick={setPerspectiveReverse}>reverse</button>
        <button onClick={setFullScreen}>FullScreen</button>
        
    </div>
  )
}

function Settings (){
  const {isSettings} = useGlobalContext()
  return (
    <>
    {
       isSettings? <SettingsWrapped/> : ""
    }
    </>
  )
}

export default Settings