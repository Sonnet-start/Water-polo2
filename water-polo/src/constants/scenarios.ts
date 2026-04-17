import type { Player, Scenario } from "../types";
import { FIELD_HEIGHT, GOAL_WIDTH, GOAL_Y, LINE_2M, LINE_5M, LINE_6M } from "./field";

const centerY = FIELD_HEIGHT / 2;

const createAttacker = (id: string, x: number, y: number): Player => ({
  id,
  role: "attacker",
  team: "white",
  position: { x, y },
});

const createDefender = (id: string, x: number, y: number, assignedTo?: string): Player => ({
  id,
  role: "defender",
  team: "blue",
  position: { x, y },
  assignedTo,
});

const createGoalkeeper = (id: string, x: number, y: number): Player => ({
  id,
  role: "goalkeeper",
  team: "red",
  position: { x, y },
});

export const scenarios: Record<Scenario, Player[]> = {
  "equal-6x6": [
    createAttacker("a1", LINE_2M + 30, centerY - 80),
    createAttacker("a2", LINE_2M + 30, centerY),
    createAttacker("a3", LINE_2M + 30, centerY + 80),
    createAttacker("a4", LINE_5M, centerY - 60),
    createAttacker("a5", LINE_5M, centerY),
    createAttacker("a6", LINE_5M, centerY + 60),
    createDefender("d1", 40, centerY - 80, "a1"),
    createDefender("d2", 40, centerY, "a2"),
    createDefender("d3", 40, centerY + 80, "a3"),
    createDefender("d4", LINE_2M - 20, centerY - 60, "a4"),
    createDefender("d5", LINE_2M - 20, centerY, "a5"),
    createDefender("d6", LINE_2M - 20, centerY + 60, "a6"),
    createGoalkeeper("g1", 20, GOAL_Y + GOAL_WIDTH / 2),
  ],
  "extra-4-2": [
    createAttacker("a1", LINE_2M, centerY - 90),
    createAttacker("a2", LINE_2M, centerY - 30),
    createAttacker("a3", LINE_2M, centerY + 30),
    createAttacker("a4", LINE_2M, centerY + 90),
    createAttacker("a5", LINE_5M, centerY - 40),
    createAttacker("a6", LINE_5M, centerY + 40),
    createDefender("d1", 40, centerY - 90, "a1"),
    createDefender("d2", 40, centerY + 90, "a4"),
    createDefender("d3", LINE_2M - 20, centerY - 60, "a2"),
    createDefender("d4", LINE_2M - 20, centerY + 60, "a3"),
    createDefender("d5", LINE_2M - 20, centerY, "a5"),
    createDefender("d6", LINE_2M - 20, centerY, "a6"),
    createGoalkeeper("g1", 20, GOAL_Y + GOAL_WIDTH / 2),
  ],
  "extra-3-3": [
    createAttacker("a1", LINE_2M, centerY - 90),
    createAttacker("a2", LINE_2M, centerY),
    createAttacker("a3", LINE_2M, centerY + 90),
    createAttacker("a4", LINE_5M, centerY - 80),
    createAttacker("a5", LINE_5M, centerY),
    createAttacker("a6", LINE_5M, centerY + 80),
    createDefender("d1", 40, centerY - 90, "a1"),
    createDefender("d2", 40, centerY, "a2"),
    createDefender("d3", 40, centerY + 90, "a3"),
    createDefender("d4", LINE_2M - 20, centerY - 40, "a4"),
    createDefender("d5", LINE_2M - 20, centerY + 40, "a6"),
    createGoalkeeper("g1", 20, GOAL_Y + GOAL_WIDTH / 2),
  ],
  "m-zone": [
    createAttacker("a1", LINE_2M, centerY - 90),
    createAttacker("a2", LINE_2M, centerY),
    createAttacker("a3", LINE_2M, centerY + 90),
    createAttacker("a4", LINE_5M, centerY - 90),
    createAttacker("a5", LINE_6M, centerY),
    createAttacker("a6", LINE_5M, centerY + 90),
    createDefender("d1", 30, GOAL_Y - 20, "a1"),
    createDefender("d2", 30, GOAL_Y + GOAL_WIDTH + 20, "a3"),
    createDefender("d3", 40, centerY - 60, "a2"),
    createDefender("d4", 40, centerY + 60, "a4"),
    createDefender("d5", LINE_2M - 20, centerY - 30, "a5"),
    createDefender("d6", LINE_2M - 20, centerY + 30, "a6"),
    createGoalkeeper("g1", 20, GOAL_Y + GOAL_WIDTH / 2),
  ],
};

export const scenarioNames: Record<Scenario, string> = {
  "equal-6x6": "Равно (6x6)",
  "extra-4-2": "Лишний 4-2",
  "extra-3-3": "Лишний 3-3",
  "m-zone": "М-Зона",
};
