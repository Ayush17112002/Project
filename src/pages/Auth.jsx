import { useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import styles from "./Auth.module.css";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { actions } from "../store";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const email = useRef(null);
  const password = useRef(null);
  async function onLoginHandler(e) {
    try {
      e.preventDefault();
      const user = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      setIsError(false);
      setError("");
      const token = user.user.accessToken;
      dispatch(actions.setToken(token));
      navigate("/home");
    } catch (err) {
      setIsError(true);
      setError(err?.code);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  }

  async function onSignUpHandler(e) {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      setIsError(false);
      const token = user.user.accessToken;
      dispatch(actions.setToken(token));
      navigate("/home");
    } catch (err) {
      setIsError(true);
      setError(err?.code);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  }

  return (
    <>
      {isError && <Error>{error}</Error>}
      <div className={styles.auth}>
        <div className={styles.container}>
          <div className={styles.box}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              autoComplete="off"
              placeholder="xyz@gmail.com"
              ref={email}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              minLength={8}
              ref={password}
            />
          </div>
          <div className={styles.btns}>
            <button
              onClick={onLoginHandler}
              className={styles.btn}
              type="submit"
            >
              Login
            </button>
            <button
              onClick={onSignUpHandler}
              className={styles.btn}
              type="submit"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
