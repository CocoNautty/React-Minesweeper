import './App.css'
import { GameProvider } from './context/GameProvider'
import ControlPanel from './components/ControlPanel/ControlPanel'
import Board from './components/Board/Board'
import Records from './components/Scoreboard/Scoreboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import WinModal from './components/Modals/WinModal'
import LoseModal from './components/Modals/LoseModal'

/**
 * The root component for the game application.
 * 
 * Wraps the main game interface in a GameProvider context.
 * Renders components for score display, control panel, game board,
 * and modals for win / loss notifications.
 * 
 * Displays a warning message on mobile devices indicating that the game
  * should be played on a larger screen with mouse support.
 *
 * @component
    * @returns { JSX.Element } The rendered App component.
 */

function App() {
  return (
    <div id='App'>
      <GameProvider>
        <div id='heading container'>
          <Records />
          <WinModal />
          <LoseModal />
        </div>

        <div className="desktop-only">
          <div id='control-panel'>
            <ControlPanel></ControlPanel>
          </div>
          <div id='board'>
            <Board></Board>
          </div>
        </div>

        <div className="mobile-message" style={{
          padding: '15px',
          margin: '15px',
          textAlign: 'center',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}>
          <p style={{ padding: 0, margin: 0 }}>⚠️ Sorry... You'll have to play on a larger monitor and with a mouse that can right click. ⚠️</p>
        </div>

        <footer><p>Yixuan Chen, Anlin Ma &copy; 2025</p></footer>
      </GameProvider>
    </div>
  )
}

export default App
