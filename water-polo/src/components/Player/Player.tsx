import type { Player as PlayerType } from "../../types";
import styles from "./Player.module.css";

interface PlayerProps {
  player: PlayerType;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export function Player({ player, isSelected, onClick }: PlayerProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`${styles.player} ${styles[player.team]} ${isSelected ? styles.selected : ""}`}
      style={{
        left: player.position.x,
        top: player.position.y,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(player.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
          onClick(player.id);
        }
      }}
    />
  );
}
