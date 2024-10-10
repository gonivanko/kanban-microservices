import React from "react";
import type { Task } from "../../types/Task.type";
import AddTask from "../AddTask/AddTask";
import DropArea from "../DropArea/DropArea";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  label: string;
  icon: string;
  tasks: Task[];
  setActiveCard: (card: { id: string; status: string } | null) => void;
  onDrop: (status: string, position: number) => void;
}

export default function CategoryCard({
  label,
  tasks,
  icon,
  setActiveCard,
  onDrop,
}: CategoryCardProps) {
  return (
    <div className={styles.root}>
      <h2 className="column-name">{icon + label}</h2>
      <DropArea onDrop={() => onDrop(label, 0)} />
      {tasks.map((task, index) => (
        <React.Fragment key={task.id}>
          <TaskCard
            task={task}
            index={index}
            setActiveCard={() =>
              setActiveCard({ id: task.id, status: task.status })
            }
          />
          <DropArea onDrop={() => onDrop(label, index + 1)} />
        </React.Fragment>
      ))}
      <AddTask />
    </div>
  );
}
