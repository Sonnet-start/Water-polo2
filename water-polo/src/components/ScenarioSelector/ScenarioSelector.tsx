import { scenarioNames } from "../../constants/scenarios";
import type { Scenario } from "../../types";
import styles from "./ScenarioSelector.module.css";

interface ScenarioSelectorProps {
  currentScenario: Scenario;
  onChange: (scenario: Scenario) => void;
}

const scenarioKeys = Object.keys(scenarioNames) as Scenario[];

export function ScenarioSelector({ currentScenario, onChange }: ScenarioSelectorProps) {
  return (
    <div className={styles.container}>
      {scenarioKeys.map((key) => (
        <button
          type="button"
          key={key}
          className={`${styles.button} ${currentScenario === key ? styles.active : ""}`}
          onClick={() => onChange(key)}
        >
          {scenarioNames[key]}
        </button>
      ))}
    </div>
  );
}
