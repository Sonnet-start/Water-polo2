import type { Position } from "../../types";
import styles from "./Ball.module.css";

interface BallProps {
  position: Position;
}

export function Ball({ position }: BallProps) {
  return (
    <div
      className={styles.ball}
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );
}
