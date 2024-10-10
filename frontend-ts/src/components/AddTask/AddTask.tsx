import { Plus } from "lucide-react";
import styles from "./AddTask.module.scss";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setShowTask } from "../../redux/slices/alertSlice";

export default function AddTask() {
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(setShowTask(true));
  };

  return (
    <div onClick={handleOpenModal} className={styles.root}>
      <Plus />
    </div>
  );
}
