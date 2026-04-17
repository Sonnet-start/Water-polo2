import { useEffect } from "react";
import { Ball } from "./components/Ball/Ball";
import { GameField } from "./components/GameField/GameField";
import { Player } from "./components/Player/Player";
import { ScenarioSelector } from "./components/ScenarioSelector/ScenarioSelector";
import { useGame } from "./hooks/useGame";
import "./App.css";

function App() {
  const { state, setScenario, selectPlayer, shoot, score, movePlayerPosition, moveSelectedPlayer, resetPassCount } =
    useGame();

  const handleShoot = () => {
    shoot();
    resetPassCount();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!state.selectedPlayerId) return;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          moveSelectedPlayer(0, -15);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          moveSelectedPlayer(0, 15);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          moveSelectedPlayer(-15, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          moveSelectedPlayer(15, 0);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.selectedPlayerId, moveSelectedPlayer]);

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
            onDragEnd={movePlayerPosition}
          />
        ))}
        <Ball position={state.ball.position} />
      </GameField>
      <div className="controls">
        {state.selectedPlayerId && state.players.find((p) => p.id === state.selectedPlayerId)?.role === "attacker" && (
          <div className="move-arrows">
            <button
              type="button"
              className="arrow-btn left"
              onClick={() => moveSelectedPlayer(-20, 0)}
            >
              ← к воротам
            </button>
            <button
              type="button"
              className="arrow-btn right"
              onClick={() => moveSelectedPlayer(20, 0)}
            >
              от ворот →
            </button>
          </div>
        )}
        <button type="button" className="shoot-btn" onClick={handleShoot}>
          Бросок
        </button>
      </div>
      <p className="instructions">
        Выбери нападающего → стрелки/WASD или кнопки → движение к воротам.
        Перетаскивание — изменить позицию.
      </p>
    </div>
  );
}

export default App;
