import { useSelector } from "react-redux";
import styles from "./Tabs.module.css";

export default function Tabs({ showHandler, questionOnScreen }) {
  const state = useSelector((state) => state);
  return (
    <div className={styles.tabs}>
      {state.quiz.map((question, index) => {
        const check =
          state.answered[index] !== null && state.answered[index] !== undefined;
        return (
          <div
            id={index}
            key={index}
            onClick={showHandler}
            className={`${styles.index} ${check && styles.checked}`}
          >
            {index}
          </div>
        );
      })}
    </div>
  );
}
