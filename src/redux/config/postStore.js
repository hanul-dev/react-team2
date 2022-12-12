import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../modules/postSlice";
import commentsReducer from "../modules/commentsSlice";

export const postStore = configureStore({
  reducer: { postReducer, commentsReducer },
});
