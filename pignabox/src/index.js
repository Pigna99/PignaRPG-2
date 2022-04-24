import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context';
import { CameraProvider } from './contexts/cameraContext';
import { BoardProvider } from './contexts/boardContext';
import { PlayerProvider } from './contexts/playerContext';



//contexts>
// GLOBALCONTEXT>
//    CAMERACONTEXT>
//        BOARDCONTEXT>
//            PLAYERCONTEXT>


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <CameraProvider>
        <BoardProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </BoardProvider>
      </CameraProvider>
    </AppProvider>
  </React.StrictMode>
);

