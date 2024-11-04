import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setShowEditProfile } from "../../redux/slices/alertSlice";
import styles from "./NewProjectModal.module.scss";
import { info_labels } from "../../static_store/personal_labels";
import { useState } from "react";

export default function EditProfileModal() {
  const [formValues, setFormValues] = useState({
    fullName: "Alexa Rawles",
    gender: "Female",
    language: "English",
    country: "Spain",
    nickName: "alexaraw4",
    timeZone: "GMT+2",
  });

  const dispatch = useAppDispatch();

  const { showEditProfile } = useAppSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(setShowEditProfile(false));
  };

  const handleSubmit = () => {};

  return (
    <>
      <article
        className={`${styles.root} ${showEditProfile ? styles.show_modal : ""}`}
      >
        <div className={styles.header}>
          <h2>Edit Personal Information</h2>
          <X onClick={handleClose} />
        </div>
        {info_labels.map((label) => {
          return label.label === "Gender" ||
            label.label === "Language" ||
            label.label === "Country" ||
            label.label === "Time Zone" ? (
            <select
              key={label.label}
              className={styles.inputField}
              defaultValue="placeholder"
            >
              <option value="placeholder" disabled>
                {label.value}
              </option>
            </select>
          ) : (
            <input
              key={label.label}
              type="text"
              className={styles.inputField}
              value={label.value}
            />
          );
        })}
        <button onClick={handleSubmit}>Save Changes</button>
      </article>
      <div
        onClick={handleClose}
        className={`${styles.overlay} ${
          showEditProfile ? styles.show_modal : ""
        }`}
      />
    </>
  );
}
