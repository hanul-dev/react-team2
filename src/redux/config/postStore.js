import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../modules/postSlice";
import commentsReducer from "../modules/commentsSlice";
import detailReducer from "../modules/detailSlice";

export const postStore = configureStore({
  reducer: { postReducer, commentsReducer, detailReducer },
});
