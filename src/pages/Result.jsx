import { useEffect, useState } from "react";
import Error from "../components/Error";
import styles from "./Result.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Protected from "../components/Protected";
export default function Result() {
  const [results, setResults] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const state = useSelector((state) => state);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/quiz`,
          {
            answers: state.answered,
            questions: state.quiz,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setResults(response.data.docs);
        } else {
          throw new Error("Error");
        }
        setError("");
      } catch (err) {
        setError("Error in fetching results");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, []);
  return (
    <Protected>
      {error.length > 0 ? (
        <Error>Error</Error>
      ) : isLoading ? (
        <Error>Loading</Error>
      ) : (
        <div className={styles.container}>
          <div className={styles.text}>
            Your score is : {results.correctCount} / {results.result.length}
          </div>
        </div>
      )}
    </Protected>
  );
}
