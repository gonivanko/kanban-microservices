export type Task = {
  id: string;
  title: string;
  text: string;
  status: string;
  category: {
    label: string;
    color: string;
  };
};

export type GroupedTasks = {
  [status: string]: Task[];
};
