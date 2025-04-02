import './App.css'
import { GameProvider } from './context/GameProvider'
import ControlPanel from './components/ControlPanel/ControlPanel'
import Board from './components/Board/Board'
import Records from './components/Scoreboard/Scoreboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import WinModal from './components/Modals/WinModal'
import LoseModal from './components/Modals/LoseModal'
import { useState, useEffect, useRef } from 'react'

function App() {
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(window.innerWidth >= 1000);
  const prevWidth = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // Only update state when crossing the breakpoint threshold
      if ((currentWidth >= 1000 && prevWidth.current < 1000) ||
          (currentWidth < 1000 && prevWidth.current >= 1000)) {
        setIsTabletOrLarger(currentWidth >= 1000);
      }
      prevWidth.current = currentWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id='App'>
      <GameProvider>
        <div id='heading container'>
          <Records />
          <WinModal />
          <LoseModal />
        </div>

        {isTabletOrLarger ? (
          <>
            <div id='control-panel'>
              <ControlPanel></ControlPanel>
            </div>
            <div id='board'>
              <Board></Board>
            </div>
          </>
        ) : (
          <div className="device-warning" style={{
            padding: '20px',
            textAlign: 'center',
            margin: '20px auto'
          }}>
            <p>⚠️ Sorry... You'll have to play on a larger monitor and with a mouse that can right click. ⚠️ </p>
          </div>
        )}
        <footer><p>Yixuan Chen, Anlin Ma &copy; {new Date().getFullYear()}</p></footer>
      </GameProvider>
    </div>
  )
}

export default App
