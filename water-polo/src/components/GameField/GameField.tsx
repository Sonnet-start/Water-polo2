import type { ReactNode } from "react";
import { FIELD_HEIGHT, FIELD_WIDTH } from "../../constants/field";
import styles from "./GameField.module.css";

interface GameFieldProps {
  children?: ReactNode;
}

export function GameField({ children }: GameFieldProps) {
  return (
    <div className={styles.field} style={{ width: FIELD_WIDTH, height: FIELD_HEIGHT }}>
      <div className={styles.line2m} />
      <div className={styles.line5m} />
      <div className={styles.line6m} />
      <div className={styles.goalArea} />
      <div className={styles.goal} />
      {children}
    </div>
  );
}
