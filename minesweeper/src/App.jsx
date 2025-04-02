import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GameProvider } from './context/GameProvider'
import ControlPanel from './components/ControlPanel/ControlPanel'
import Board from './components/Board/Board'
import Records from './components/Scoreboard/Scoreboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import WinModal from './components/Modals/WinModal'
import LoseModal from './components/Modals/LoseModal'
function App() {

  return (
    <div id='App'>
      <GameProvider>
        <div id='heading container'>
          <Records />
          <WinModal />
          <LoseModal />
        </div>
        <div id='control-panel'>
          <ControlPanel></ControlPanel>
        </div>
        <div id='board'>
          <Board></Board>
        </div>
        <footer><p>Yixuan Chen, Anlin Ma &copy; {new Date().getFullYear()}</p></footer>
      </GameProvider>
    </div>
  )
}

export default App
