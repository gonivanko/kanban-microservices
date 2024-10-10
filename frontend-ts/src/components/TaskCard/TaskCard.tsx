import type { Task } from "../../types/Task.type";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: Task;
  index: number;
  setActiveCard: (arg: number | null) => void;
}

export default function TaskCard({
  task,
  setActiveCard,
  index,
}: TaskCardProps) {
  return (
    <div
      className={styles.root}
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <h4>{task.title}</h4>
      <p>{task.text}</p>
      <div className={styles.bottom_block}>
        <span style={{ backgroundColor: `${task.category.color}` }}>
          {task.category.label}
        </span>
      </div>
    </div>
  );
}
