import { configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * {
 *  name: string,
 *  quiz: [{}, {}, {}, ...] ,Array of objects, each object representing 1 question
 *  token: string,
 *  hasBegun: boolean,
 *  category: string,
 *  answered: {index of question: option chosen}
 * }
 */

const initialState = {
  name: "",
  quiz: [],
  token: null,
  hasBegun: false,
  category: null,
  answered: {},
};

function doesExistsInLS(prop) {
  return localStorage.hasOwnProperty(prop);
}
function setItemInReduxFromLS(prop) {
  let value = localStorage.getItem(prop);
  if (["answered", "quiz"].includes(prop))
    value = JSON.parse(localStorage.getItem(prop));
  initialState[prop] = value;
}
const arr = ["name", "hasBegun", "category", "answered", "quiz", "token"];
arr.forEach((prop) => {
  if (doesExistsInLS(prop)) {
    setItemInReduxFromLS(prop);
  } else {
    localStorage.setItem(prop, JSON.stringify(initialState[prop]));
  }
});
const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    choseCategory(prevState, action) {
      const category = action.payload;
      prevState.category = category;
      localStorage.setItem("category", category);
    },
    setUserName(prevState, action) {
      const name = action.payload;
      prevState.name = name;
      localStorage.setItem("name", name);
    },
    setQuiz(prevState, action) {
      const quiz = action.payload;
      prevState.quiz = action.payload;
      prevState.hasBegun = true;
      localStorage.setItem("hasBegun", true);
      localStorage.setItem("quiz", JSON.stringify(quiz));
    },
    setAnswer(prevState, action) {
      const { q, a } = action.payload;
      prevState.answered[q] = a;
      const answers = { ...prevState.answered, q: a };
      localStorage.setItem("answered", JSON.stringify(answers));
    },
    setToken(prevState, action) {
      const token = action.payload;
      prevState.token = token;
      localStorage.setItem("token", token);
    },
    endSession(prevState, action) {
      const token = localStorage.getItem("token");
      prevState = { token };
      localStorage.clear();
      localStorage.setItem("token", token);
    },
  },
});
export const actions = slice.actions;
export default configureStore({ reducer: slice.reducer });
