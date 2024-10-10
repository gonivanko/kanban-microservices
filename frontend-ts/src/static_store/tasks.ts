import { category_labels } from "./category_labels";
import { task_category } from "./task_category";

export const tasks = [
  {
    id: "231-ecdf-2",
    title: "VideoGame",
    text: "Develop admin page and server integration",
    category: task_category[0],
    status: category_labels[0].label,
  },

  {
    id: "231-ecdf-4",
    title: "Tg Web App",
    text: "Develop admin page and server integration",
    category: task_category[2],
    status: category_labels[1].label,
  },
  {
    id: "231-ecdf-5",
    title: "VideoGame 2",
    text: "Develop admin page and server integration",
    category: task_category[0],
    status: category_labels[3].label,
  },
  {
    id: "231-ecdf-6",
    title: "E-commerce 2",
    text: "Develop admin page and server integration",
    category: task_category[1],
    status: category_labels[3].label,
  },
  {
    id: "231-ecdf-7",
    title: "Tg Web App 2",
    text: "Develop admin page and server integration",
    category: task_category[0],
    status: category_labels[2].label,
  },
];
