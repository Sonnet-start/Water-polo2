import { useCallback, useState } from "react";
import { FIELD_HEIGHT, FIELD_WIDTH, GOAL_WIDTH, GOAL_Y } from "../constants/field";
import { scenarios } from "../constants/scenarios";
import type { Ball, GameState, Player, Position, Scenario } from "../types";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const MOVE_STEP = 15;

const getRandomAttacker = (players: Player[]): Player | null => {
  const attackers = players.filter((p) => p.role === "attacker");
  if (attackers.length === 0) return null;
  return attackers[Math.floor(Math.random() * attackers.length)];
};

const getInitialBall = (players: Player[]): Ball => {
  const holder = getRandomAttacker(players);
  return {
    position: holder ? { ...holder.position } : { x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2 },
    holderId: holder?.id ?? null,
  };
};

const moveDefenders = (players: Player[]): Player[] => {
  return players.map((player) => {
    if (player.role !== "defender") return player;

    const assignedAttacker = player.assignedTo
      ? players.find((p) => p.id === player.assignedTo)
      : null;

    if (assignedAttacker) {
      const newX = assignedAttacker.position.x - 30;
      const newY = assignedAttacker.position.y;
      return { ...player, position: { x: newX, y: newY } };
    }
    return player;
  });
};

const movePlayer = (players: Player[], playerId: string, newPosition: Position): Player[] => {
  return players.map((player) => {
    if (player.id !== playerId) return player;
    const clampedX = clamp(newPosition.x, 10, FIELD_WIDTH - 10);
    const clampedY = clamp(newPosition.y, 10, FIELD_HEIGHT - 10);
    return { ...player, position: { x: clampedX, y: clampedY } };
  });
};

const moveGoalkeeper = (goalkeeper: Player, ballPosition: Position): Player => {
  const goalCenterY = GOAL_Y + GOAL_WIDTH / 2;
  const maxAngle = 60;
  const maxMove = 40;

  const dy = ballPosition.y - goalCenterY;
  const dx = ballPosition.x;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const clampedAngle = Math.max(-maxAngle, Math.min(maxAngle, angle));
  const moveY = (clampedAngle / maxAngle) * maxMove;

  return {
    ...goalkeeper,
    position: { x: goalkeeper.position.x, y: goalCenterY + moveY },
  };
};

export function useGame(initialScenario: Scenario = "equal-6x6") {
  const [state, setState] = useState<GameState>(() => {
    const players = scenarios[initialScenario];
    return {
      players,
      ball: getInitialBall(players),
      scenario: initialScenario,
      selectedPlayerId: null,
      passCount: 0,
    };
  });
  const [score, setScore] = useState({ white: 0, blue: 0 });

  const setScenario = useCallback((scenario: Scenario) => {
    const players = scenarios[scenario];
    setState({
      players,
      ball: getInitialBall(players),
      scenario,
      selectedPlayerId: null,
      passCount: 0,
    });
  }, []);

  const shoot = useCallback(() => {
    setState((prev) => {
      if (!prev.ball.holderId) return prev;

      const shooter = prev.players.find((p) => p.id === prev.ball.holderId);
      if (!shooter) return prev;

      const goalY = GOAL_Y + GOAL_WIDTH / 2;
      const randomGoalY = goalY + (Math.random() - 0.5) * GOAL_WIDTH * 0.8;

      const newBall: Ball = {
        position: { x: 0, y: randomGoalY },
        holderId: null,
      };

      const updatedPlayers = prev.players.map((p) => {
        if (p.role === "goalkeeper") {
          return moveGoalkeeper(p, newBall.position);
        }
        return p;
      });

      setTimeout(() => {
        setScore((s) => ({ ...s, white: s.white + 1 }));
      }, 500);

      return { ...prev, ball: newBall, players: updatedPlayers };
    });
  }, []);

  const selectPlayer = useCallback((playerId: string) => {
    setState((prev) => {
      const clickedPlayer = prev.players.find((p) => p.id === playerId);
      if (!clickedPlayer) return prev;

      if (prev.selectedPlayerId === null) {
        if (clickedPlayer.role === "attacker") {
          return { ...prev, selectedPlayerId: playerId };
        }
        return prev;
      }

      const selectedPlayer = prev.players.find((p) => p.id === prev.selectedPlayerId);
      if (!selectedPlayer || selectedPlayer.role !== "attacker") {
        return { ...prev, selectedPlayerId: clickedPlayer.role === "attacker" ? playerId : null };
      }

      if (clickedPlayer.role === "attacker" && clickedPlayer.id !== selectedPlayer.id) {
        const newBall: Ball = {
          position: { ...clickedPlayer.position },
          holderId: clickedPlayer.id,
        };

        let updatedPlayers = prev.players;
        if (prev.passCount === 0) {
          updatedPlayers = moveDefenders(prev.players);
        }

        const goalkeeper = updatedPlayers.find((p) => p.role === "goalkeeper");
        if (goalkeeper) {
          const movedGoalkeeper = moveGoalkeeper(goalkeeper, newBall.position);
          updatedPlayers = updatedPlayers.map((p) =>
            p.role === "goalkeeper" ? movedGoalkeeper : p,
          );
        }

        return {
          ...prev,
          ball: newBall,
          selectedPlayerId: null,
          players: updatedPlayers,
          passCount: prev.passCount + 1,
        };
      }

      return { ...prev, selectedPlayerId: null };
    });
  }, []);

  const resetPassCount = useCallback(() => {
    setState((prev) => ({ ...prev, passCount: 0 }));
  }, []);

  const movePlayerPosition = useCallback((playerId: string, position: Position) => {
    setState((prev) => {
      const updatedPlayers = movePlayer(prev.players, playerId, position);
      return { ...prev, players: updatedPlayers };
    });
  }, []);

  const moveSelectedPlayer = useCallback((dx: number, dy: number) => {
    setState((prev) => {
      if (!prev.selectedPlayerId) return prev;
      const updatedPlayers = prev.players.map((p) => {
        if (p.id !== prev.selectedPlayerId) return p;
        const newX = clamp(p.position.x + dx, 10, FIELD_WIDTH - 10);
        const newY = clamp(p.position.y + dy, 10, FIELD_HEIGHT - 10);
        return { ...p, position: { x: newX, y: newY } };
      });
      return { ...prev, players: updatedPlayers };
    });
  }, []);

  return {
    state,
    setScenario,
    selectPlayer,
    shoot,
    score,
    movePlayerPosition,
    moveSelectedPlayer,
    resetPassCount,
  };
}
