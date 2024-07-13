import axios from "axios";
import { useEffect, useState } from "react";
import Category from "../components/Category";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Error from "../components/Error";
import Protected from "../components/Protected";
const url = process.env.REACT_APP_URL;

export default function Home() {
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/category`);
        if (response.status === 200) {
          setCategories(response.data.docs);
        }
      } catch (err) {
        setError(err?.code);
      }
    };
    fetchCategories();
  }, []);

  async function logoutHandler() {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      setError(err?.code);
    }
  }
  return (
    <Protected>
      <div className={styles.home}>
        {error ? (
          <Error>{error}</Error>
        ) : (
          categories.map((category) => {
            return <Category key={category.name} name={category.name} />;
          })
        )}
      </div>
      <button className={styles.btn} onClick={logoutHandler}>
        Log out
      </button>
    </Protected>
  );
}
