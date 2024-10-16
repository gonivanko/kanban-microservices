import { info_labels } from "../../static_store/personal_labels";
import { splitIntoTwoColumns } from "../../utils/splitInfoLabels";
import styles from "./ProfileCard.module.scss";

export default function FormBlock() {
  const [column_1, column_2] = splitIntoTwoColumns(info_labels);
  return (
    <div className={styles.form_root}>
      <div className={styles.column}>
        {column_1.map((col) => {
          return (
            <div key={col}>
              <p>{col}</p>
              <input type="text" placeholder={col} disabled />
            </div>
          );
        })}
      </div>
      <div className={styles.column}>
        {column_2.map((col) => {
          return (
            <div key={col}>
              <p>{col}</p>
              <input type="text" placeholder={col} disabled />
            </div>
          );
        })}
      </div>
    </div>
  );
}
