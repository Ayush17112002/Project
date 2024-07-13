import logo from "./logo.svg";
import "./App.css";
import Auth from "./pages/Auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Prompt from "./pages/Prompt";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
function App() {
  const state = useSelector((state) => state);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            state.hasBegun ? (
              <Navigate to={"/quiz"} />
            ) : (
              <Navigate to={"/home"} />
            )
          }
        ></Route>
        <Route
          path="/home"
          element={state.hasBegun ? <Navigate to={"/quiz"} /> : <Home />}
        ></Route>
        <Route
          path="/prompt"
          element={
            state.hasBegun ? (
              <Navigate to={"/quiz"} />
            ) : state.category && state.category.length > 0 ? (
              <Prompt />
            ) : (
              <Navigate to={"/home"} />
            )
          }
        ></Route>
        <Route
          path="/quiz"
          element={
            state.name && state.name.length > 0 && state.category.length > 0 ? (
              <Quiz />
            ) : (
              <Navigate to={"/"} />
            )
          }
        ></Route>
        <Route
          path="/result"
          element={state.hasBegun ? <Result /> : <Navigate to={"/quiz"} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
