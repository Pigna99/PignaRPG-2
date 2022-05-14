import { CameraProvider } from './contexts/cameraContext';
import { BoardProvider } from './contexts/boardContext';
import { PlayerProvider } from './contexts/playerContext';
import { EnemyProvider } from './contexts/enemyContext';

import Settings from "./Components/Settings";
import BoardContainer from "./Components/BoardContainer";
import MouseNav from "./Components/Camera/MouseNav";
import Navigation from "./Components/Camera/Navigation";
import TurnBox from "./Components/HUD/TurnBox";
import PlayerBox from './Components/HUD/PlayerBox';





import { useGlobalContext } from "./context";
import { useCameraContext, usePlayerContext } from "./contexts";
import {setMouse} from "./utils"

import {AiFillSetting} from 'react-icons/ai'

function App() {
  const {demo} = useGlobalContext();
  return (
    <div className="App">
      {
        demo === "battle" ? <BattleWrapperContexts/>:
        <MainMenu/>
      }
      
    </div>
  );
}

const MainMenu = () => {
  const {setDemo} = useGlobalContext();
  return(
  <div style={{
    display:"flex",justifyContent:"center",alignItems:"flex-start", height:"100%"
  }}>
    <div className="mainmenu">
      <h2>DemoMenu</h2>
      <button onClick={()=>{setDemo("battle")}}>Start Demo Battle</button>
    </div>
  </div>
  )
}


const BattleWrapperContexts = ()=>{
  return(
    <>
    <CameraProvider>
        <BoardProvider>
          <EnemyProvider>
          <PlayerProvider>
            <BattleDemo/>
          </PlayerProvider>
          </EnemyProvider>
        </BoardProvider>
      </CameraProvider>
    </>
  )
}

const BattleDemo = () =>{
  const {toggleSettings} = useGlobalContext()

  const {handleCameraMovement,handleCameraStop,
    handleCamera, isCameraMoving,
    movingOffset} = useCameraContext();

  const {setPlayerWait} = usePlayerContext();
  return(
  <div className="BattleApp"  
  onMouseUp={handleCameraStop} onMouseLeave={handleCameraStop} onMouseMove={(e)=>isCameraMoving ? handleCamera(e) : ""}
  style={{//camera moving cursor
    cursor:(isCameraMoving? setMouse(movingOffset[0], movingOffset[1]) : "")
  }}>

    <AiFillSetting className="settingsbutton" onClick={toggleSettings}/>
      <Settings/>
      <div id="background" onClick={setPlayerWait}  onMouseDown={handleCameraMovement} onContextMenu={(e)=>e.preventDefault()}></div>
      <BoardContainer/>
      <TurnBox/>
      <PlayerBox/>
      <Navigation/>
      <MouseNav/>

  </div>
  )
}
export default App;
