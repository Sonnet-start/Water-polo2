export type PlayerRole = "attacker" | "defender" | "goalkeeper";

export type Team = "white" | "blue" | "red";

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  role: PlayerRole;
  team: Team;
  position: Position;
  assignedTo?: string;
}

export interface Ball {
  position: Position;
  holderId: string | null;
}

export type Scenario = "equal-6x6" | "extra-4-2" | "extra-3-3" | "m-zone";

export interface GameState {
  players: Player[];
  ball: Ball;
  scenario: Scenario;
  selectedPlayerId: string | null;
  passCount: number;
}
