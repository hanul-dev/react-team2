import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../modules/postSlice";

export const postStore = configureStore({ reducer: { postReducer } });
