import { useRef } from "react";
import styles from "./Prompt.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../store";
import Protected from "../components/Protected";
export default function Prompt() {
  const dispatch = useDispatch();
  const name = useRef(null);
  function setUserName(e) {
    dispatch(actions.setUserName(name.current.value));
  }
  return (
    <Protected>
      <div className={styles.prompt}>
        <div className={styles.form}>
          <input
            type="text"
            id="first_name"
            className={styles.inputBox}
            placeholder="Enter your name..."
            required
            ref={name}
          ></input>
          <Link to={"/quiz"} className={styles.startBtn} onClick={setUserName}>
            Start Test
          </Link>
        </div>
      </div>
    </Protected>
  );
}
