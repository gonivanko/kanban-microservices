import { LogOut, Pencil } from "lucide-react";
import styles from "./Header.module.scss";

interface HeaderProps {
  loading: boolean;
  user: {
    username: string;
  } | null;
}

export default function Header({ loading, user }: HeaderProps) {
  return (
    <div className={styles.paper}>
      <div className={styles.header}>
        <div className={styles.header_inner}>
          {loading ? (
            <div className={styles.avatar}></div>
          ) : (
            <div className={styles.avatar}>
              {user?.username.substring(0, 2)}
            </div>
          )}
          <div>
            <h1>Welcome back,</h1>
            {loading ? <p>Loading...</p> : <p>{user?.username}</p>}
          </div>
        </div>
        <div className={styles.buttons}>
          <Pencil
            // onClick={handleOpen}
            className={loading ? styles.disabled : ""}
          />
          <LogOut
            // onClick={handleOpenLogoutDialog}
            className={loading ? styles.disabled : ""}
          />
        </div>
      </div>
    </div>
  );
}
