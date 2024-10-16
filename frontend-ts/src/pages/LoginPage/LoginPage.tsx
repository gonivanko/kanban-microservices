import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import { useAuth } from "../../providers/AuthProvider";

export default function LoginPage() {
  const { setToken } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", {
        login: email,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          setToken(response.data.token);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setError(err.response.data.description);
        setShowError(true);
      });

    navigate("/");
  };

  return (
    <section className={styles.container}>
      <div className={styles.form}>
        <h1>Welcome Back!</h1>
        {showError && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.remember}>
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className={styles.button}>
            Sign in
          </button>
        </form>
        <div className={styles.link}>
          <a href="#">Forgot password?</a>
          <p>
            Don`t have an acoount?<a href="/register"> Sign up</a>
          </p>
        </div>
      </div>
    </section>
  );
}
