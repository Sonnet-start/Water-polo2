import { useRef } from "react";
import type { Player as PlayerType, Position } from "../../types";
import styles from "./Player.module.css";

interface PlayerProps {
  player: PlayerType;
  isSelected: boolean;
  onClick: (id: string) => void;
  onDragEnd: (id: string, position: Position) => void;
}

export function Player({ player, isSelected, onClick, onDragEnd }: PlayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    isDragging.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (!isDragging.current || !ref.current) return;
    isDragging.current = false;

    const field = ref.current.parentElement;
    if (!field) return;

    const fieldRect = field.getBoundingClientRect();
    const x = e.clientX - fieldRect.left;
    const y = e.clientY - fieldRect.top;

    onDragEnd(player.id, { x, y });
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      draggable
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
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
}
