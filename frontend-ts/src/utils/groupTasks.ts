import { category_labels } from "../static_store/category_labels";
import { GroupedTasks, Task } from "../types/Task.type";

export function groupTasksByStatus(tasks: Task[]): GroupedTasks {
  const grouped: GroupedTasks = {};

  category_labels.forEach(({ label }) => {
    grouped[label] = [];
  });

  tasks.forEach((task) => {
    grouped[task.status].push(task);
  });

  return grouped;
}
