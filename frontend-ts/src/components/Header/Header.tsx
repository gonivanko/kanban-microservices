import { LogOut, Pencil } from "lucide-react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  loading: boolean;
  user: {
    username: string;
  } | null;
}

export default function Header({ loading, user }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className={styles.paper}>
      <div className={styles.header}>
        <div className={styles.header_inner}>
          {/* {loading ? (
            <div className={styles.avatar}></div>
          ) : (
            <div className={styles.avatar}>
              {user?.username.substring(0, 2)}
            </div>
          )} */}
          <div className={styles.avatar}>{"Alexa Rawles".substring(0, 2)}</div>
          <div>
            <h1>Welcome back,</h1>
            {loading ? <p>Alexa Rawles</p> : <p>{user?.username}</p>}
          </div>
        </div>
        <div className={styles.buttons}>
          <Pencil
            onClick={handleProfile}
            // className={loading ? styles.disabled : ""}
          />
          <LogOut
            onClick={handleLogout}
            // className={loading ? styles.disabled : ""}
          />
        </div>
      </div>
    </div>
  );
}
