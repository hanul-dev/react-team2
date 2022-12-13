import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localho123st:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});

export const searchData = createAsyncThunk(
  "postSlice/searchData",
  async (title, thunkAPI) => {
    try {
      const res = await instance.get("/posts");
      const result = await res.data.filter((el) => el.title === title);
      return thunkAPI.fulfillWithValue(result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getLabels = createAsyncThunk(
  "postSlice/getLabels",
  async (labels, thunkAPI) => {
    try {
      const response = await instance.get("/labels");

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initial = {
  todo: [],
  searchTodo: [],
  labels: [],
  isloading: "false",
};
const postSlice = createSlice({
  name: "todo",
  initialState: initial,
  reducers: {
    initialTodos: (state, action) => {
      state.todo = action.payload;
    },
    addTodo: (state, action) => {
      instance.post("/posts", action.payload);
      state.todo = [...state.todo, action.payload];
    },
    deleteTodo: (state, action) => {
      instance.delete(`/posts/${action.payload}`);
      state.todo = state.todo.filter((el) => el.id !== action.payload);
    },
  },

  extraReducers: {
    [searchData.pending]: (state, action) => {
      state.isloading = true;
    },

    [searchData.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.searchTodo = [...payload];
    },

    [searchData.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    [getLabels.pending]: (state, action) => {
      state.isloading = true;
    },
    [getLabels.fulfilled]: (state, action) => {
      state.isloading = false;

      state.labels = action.payload;
    },
    [getLabels.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
  },
});

export const { initialTodos, addTodo, deleteTodo } = postSlice.actions;
export default postSlice.reducer;
