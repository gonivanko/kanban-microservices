import { Mail } from "lucide-react";
import FormBlock from "./FormBlock";
import styles from "./ProfileCard.module.scss";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setShowEditProfile } from "../../redux/slices/alertSlice";

export default function ProfileCard() {
  const dispatch = useAppDispatch();
  return (
    <article className={styles.root}>
      <div className={styles.header}>
        <div className={styles.avatar_block}>
          <div className={styles.avatar}>{"Alexa Rawles".substring(0, 2)}</div>
          <div className={styles.text}>
            <h4>Alexa Rawles</h4>
            <p>alexa@gmail.com</p>
          </div>
        </div>
        <button onClick={() => dispatch(setShowEditProfile(true))}>Edit</button>
      </div>
      <FormBlock />
      <div className={styles.email_block}>
        <h4>My email Address</h4>
        <div className={styles.email}>
          <div>
            <Mail fill="#303f9f" color="#e8ebff" />
          </div>
          <p>alexa@gmail.com</p>
        </div>
        <button>Add Email Address</button>
      </div>
    </article>
  );
}
