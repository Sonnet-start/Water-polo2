import { Ball } from "./components/Ball/Ball";
import { GameField } from "./components/GameField/GameField";
import { Player } from "./components/Player/Player";
import { ScenarioSelector } from "./components/ScenarioSelector/ScenarioSelector";
import { useGame } from "./hooks/useGame";
import "./App.css";

function App() {
  const { state, setScenario, selectPlayer, shoot, score } = useGame();

  return (
    <div className="app">
      <h1>Water Polo Tactics Pro</h1>
      <div className="score">
        <span>Нападение: {score.white}</span>
        <span>Защита: {score.blue}</span>
      </div>
      <ScenarioSelector currentScenario={state.scenario} onChange={setScenario} />
      <GameField>
        {state.players.map((player) => (
          <Player
            key={player.id}
            player={player}
            isSelected={state.selectedPlayerId === player.id}
            onClick={selectPlayer}
          />
        ))}
        <Ball position={state.ball.position} />
      </GameField>
      <button type="button" className="shoot-btn" onClick={shoot}>
        Бросок по воротам
      </button>
      <p className="instructions">
        Клик по игроку — выбор. Клик по другому нападающему — передача мяча.
      </p>
    </div>
  );
}

export default App;
