import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
import styles from "./NewProjectModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setShowProject } from "../../redux/slices/alertSlice";
import { X } from "lucide-react";

const NewProjectModal = () => {
  const { token } = useAuth();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const dispatch = useAppDispatch();

  const { showProject } = useAppSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(setShowProject(false));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/projects",
        {
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // onProjectAdded({
      //   name: response.data.name,
      //   description: response.data.description,
      // });

      setName("");
      setDescription("");
      handleClose();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <article
        className={`${styles.root} ${showProject ? styles.show_modal : ""}`}
      >
        <div className={styles.header}>
          <h2>Create New Project</h2>
          <X onClick={handleClose} />
        </div>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className={styles.inputField}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>Create</button>
      </article>
      <div
        onClick={handleClose}
        className={`${styles.overlay} ${showProject ? styles.show_modal : ""}`}
      />
    </>
  );
};

export default NewProjectModal;
