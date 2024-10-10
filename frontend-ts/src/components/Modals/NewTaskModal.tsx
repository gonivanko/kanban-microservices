import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
import styles from "./NewProjectModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setShowTask } from "../../redux/slices/alertSlice";
import { X } from "lucide-react";
import { task_category } from "../../static_store/task_category";
import { category_labels } from "../../static_store/category_labels";

const NewTaskModal = () => {
  const { token } = useAuth();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [taskType, setTaskType] = useState("placeholder");
  const [taskCategory, setTaskCategory] = useState("");

  const dispatch = useAppDispatch();

  const { showTask } = useAppSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(setShowTask(false));
  };

  //   const handleSubmit = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8080/api/projects",
  //         {
  //           name: name,
  //           description: description,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       onProjectAdded({
  //         name: response.data.name,
  //         description: response.data.description,
  //       });

  //       setName("");
  //       setDescription("");
  //       handleClose();
  //     } catch (error) {
  //       console.error("Error creating project:", error);
  //     }
  //   };

  return (
    <>
      <article
        className={`${styles.root} ${showTask ? styles.show_modal : ""}`}
      >
        <div className={styles.header}>
          <h2>Create New Task</h2>
          <X onClick={handleClose} />
        </div>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className={styles.inputField}
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className={styles.inputField}
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        >
          <option value="placeholder" disabled>
            Select Task Type
          </option>
          {task_category.map((option) => {
            return (
              <option key={option.color} value={option.label}>
                {option.label}
              </option>
            );
          })}
        </select>
        <div className={styles.category_buttons}>
          {category_labels.map((label) => {
            return (
              <button
                className={taskCategory === label.label ? styles.checked : ""}
                key={label.label}
                onClick={() => setTaskCategory(label.label)}
              >
                {label.label}
              </button>
            );
          })}
        </div>
        <button>Create</button>
      </article>
      <div
        onClick={handleClose}
        className={`${styles.overlay} ${showTask ? styles.show_modal : ""}`}
      />
    </>
  );
};

export default NewTaskModal;
