import { useState } from "react";
import styles from "./Login.module.css";
import { api } from "../../utils/api";
import { loginAtom } from "../../utils/atom";
import { useSetAtom } from "jotai";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setLogInAtom = useSetAtom(loginAtom);
  const navigate = useNavigate();

  async function handlSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/login", {
        name,
        password,
      });
      setLogInAtom(true);
      navigate("/");
    } catch (e: any) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>🏫</div>
            <h1 className={styles.logoText}>School Management</h1>
          </div>
          <p className={styles.subtitle}>Admin Login Portal</p>
        </div>

        {/* Login Form */}
        <form className={styles.form} onSubmit={handlSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <div className={styles.inputGroup}>
              <input
                type="text"
                required
                className={styles.input}
                placeholder="Enter your username"
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputGroup}>
              <input
                type="password"
                required
                className={styles.input}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`${styles.loginButton} ${
              isLoading ? styles.loading : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className={styles.spinner} />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <span className={styles.buttonArrow}>→</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            © 2024 School Management System. All rights reserved.
          </p>
        </div>
      </div>

      {/* Background Animation */}
      <div className={styles.background}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>
    </div>
  );
};

export default Login;
