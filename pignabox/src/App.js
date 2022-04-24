import Player from "./Components/Player";
import Settings from "./Components/Settings";
import Board from "./Components/Board";
import { useGlobalContext } from "./context";

import {AiFillSetting} from 'react-icons/ai'

function App() {
  const {scaling, zindex, isSettings, toggleSettings} = useGlobalContext()

  return (
    <div className="App" >
      <AiFillSetting className="settingsbutton" onClick={toggleSettings}/>
      {
        isSettings? <Settings/> : ""
      }
      <div className="boardcontainer" style={{perspective:2600, transform:`scale(${scaling/50})`, zIndex:1, position:"relative",
        top:`${zindex}px`,
        transition: "all 0.1s linear"
        }}>
        <Board/>
      </div>
      
    </div>
  );
}
export default App;
