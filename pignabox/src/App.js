
import Navigation from "./Components/Navigation";
import Settings from "./Components/Settings";
import BoardContainer from "./Components/BoardContainer";
import MouseNav from "./Components/MouseNav";

import { useGlobalContext } from "./context";
import { useCameraContext, usePlayerContext } from "./contexts";
import {setMouse} from "./utils"

import {AiFillSetting} from 'react-icons/ai'

function App() {
  const {toggleSettings} = useGlobalContext()

  const {handleCameraMovement,handleCameraStop,
    handleCamera, isCameraMoving,
    movingOffset} = useCameraContext();

  const {setPlayerWait} = usePlayerContext();


  return (
    <div className="App" onMouseUp={handleCameraStop} onMouseLeave={handleCameraStop} onMouseMove={(e)=>isCameraMoving ? handleCamera(e) : ""}
      style={{//camera moving cursor
        cursor:(isCameraMoving? setMouse(movingOffset[0], movingOffset[1]) : "")
      }}
    >
      <AiFillSetting className="settingsbutton" onClick={toggleSettings}/>
      <Settings/>
      <div id="background" onClick={setPlayerWait}  onMouseDown={handleCameraMovement} onContextMenu={(e)=>e.preventDefault()}></div>
      <BoardContainer/>
      <Navigation/>
      <MouseNav/>
    </div>
  );
}
export default App;
