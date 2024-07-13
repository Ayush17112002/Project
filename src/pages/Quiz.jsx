import { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import Tabs from "../components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/Error";
import Protected from "../components/Protected";
export default function Quiz() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [questionOnScreen, setQuestionOnScreen] = useState(0);
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  function showHandler(event) {
    setQuestionOnScreen(event.target.id); //the question's index which has clicked
  }

  function checkBoxHandler(event) {
    let a = event.target.id;
    if (state.answered[questionOnScreen] == a) a = null;
    dispatch(actions.setAnswer({ q: questionOnScreen, a }));
  }

  function submitHandler() {
    navigate("/result");
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/quiz/${state.category}`
        );
        if (response.status === 200) {
          dispatch(actions.setQuiz(response.data.quiz));
        } else {
          throw new Error("Error in fetching the questions");
        }
        setError("");
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (state.hasBegun) {
      setIsLoading(false);
      return;
    } else {
      fetchQuestions();
    }
  }, []);
  return (
    <Protected>
      <div className={styles.quiz}>
        {error.length > 0 && <Error>Error</Error>}
        {isLoading && <Error>Loading</Error>}
        {!isLoading && !error.length && (
          <div className={styles.container}>
            <Tabs
              showHandler={showHandler}
              questionOnScreen={questionOnScreen}
            />
            <div className={styles.question}>
              <p className={styles.name}>{state.quiz[questionOnScreen].name}</p>
              {[0, 1, 2, 3].map((index) => {
                const isChecked = state.answered[questionOnScreen] == index;
                return (
                  <Option
                    id={index}
                    checked={isChecked}
                    checkBoxHandler={checkBoxHandler}
                    value={state.quiz[questionOnScreen].choice[index]}
                  />
                );
              })}
            </div>
            <button
              type="submit"
              className={styles.btn}
              onClick={submitHandler}
            >
              End Test
            </button>
          </div>
        )}
      </div>
    </Protected>
  );
}

function Option({ checked, id, checkBoxHandler, value }) {
  return (
    <div className={styles.checkBox}>
      <input
        checked={checked}
        type="checkbox"
        className={styles.checkBoxInput}
        id={id}
        onChange={checkBoxHandler}
      ></input>
      <div className="">{value}</div>
    </div>
  );
}
