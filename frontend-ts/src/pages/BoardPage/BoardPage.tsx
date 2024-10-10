import { useState } from "react";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Header from "../../components/Header/Header";
import NewTaskModal from "../../components/Modals/NewTaskModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import { category_labels } from "../../static_store/category_labels";
import styles from "./BoardPage.module.scss";
import { GroupedTasks } from "../../types/Task.type";
import { groupTasksByStatus } from "../../utils/groupTasks";
import { tasks } from "../../static_store/tasks";

function BoardPage() {
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>(
    groupTasksByStatus(tasks)
  );
  const [activeCard, setActiveCard] = useState<{
    id: string;
    status: string;
  } | null>(null);

  const onDrop = (targetStatus: string, position: number) => {
    if (!activeCard) return;

    setGroupedTasks((prevGrouped) => {
      const newGrouped = { ...prevGrouped };

      const sourceStatusTasks = newGrouped[activeCard.status];
      const taskIndex = sourceStatusTasks.findIndex(
        (task) => task.id === activeCard.id
      );
      const [movedTask] = sourceStatusTasks.splice(taskIndex, 1);

      movedTask.status = targetStatus;

      const targetStatusTasks = newGrouped[targetStatus];
      targetStatusTasks.splice(position, 0, movedTask);

      return newGrouped;
    });
  };

  return (
    <>
      <section className={styles.root}>
        <Header loading user={null} />
        <SearchBar type="task" />
        <div className={styles.projects_block}>
          {category_labels.map((label) => {
            return (
              <CategoryCard
                key={label.label}
                label={label.label}
                icon={label.icon}
                tasks={groupedTasks[label.label]}
                setActiveCard={setActiveCard}
                onDrop={onDrop}
              />
            );
          })}
        </div>
      </section>
      <NewTaskModal />
    </>
  );
}

export default BoardPage;
