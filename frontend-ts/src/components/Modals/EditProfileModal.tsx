import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setShowEditProfile } from "../../redux/slices/alertSlice";
import styles from "./NewProjectModal.module.scss";
import { info_labels } from "../../static_store/personal_labels";

export default function EditProfileModal() {
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
          return label === "Gender" ||
            label === "Language" ||
            label === "Country" ||
            label === "Time Zone" ? (
            <select
              key={label}
              className={styles.inputField}
              defaultValue="placeholder"
            >
              <option value="placeholder" disabled>
                {label}
              </option>
            </select>
          ) : (
            <input
              key={label}
              type="text"
              className={styles.inputField}
              placeholder={label}
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
