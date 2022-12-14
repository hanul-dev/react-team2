import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});

export const searchData = createAsyncThunk(
  "postSlice/searchData",
  async (title, thunkAPI) => {
    try {
      const res = await instance.get("/posts");
      const result = res.data.filter((el) => el.title === title);
      return thunkAPI.fulfillWithValue(result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchLabels = createAsyncThunk(
  "postSlice/searchLabels",
  async (label, thunkAPI) => {
    try {
      const res = await instance.get("/posts");
      const result = res.data.filter((el) => {
        return el.label === label;
      });
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
      const result = [...response.data];
      return thunkAPI.fulfillWithValue(result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initial = {
  todo: [],
  searchTodo: null,
  searchLabel: null,
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
    initTodo: (state, action) => {
      console.log("in");
      state.searchTodo = null;
      state.searchLabel = null;
    },
  },

  extraReducers: {
    //검색기능
    [searchData.pending]: (state, action) => {
      state.isloading = true;
    },
    [searchData.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.searchLabel = null;
      state.searchTodo = [...payload];
    },
    [searchData.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    //라벨검색기능
    [searchLabels.pending]: (state, action) => {
      state.isloading = true;
    },
    [searchLabels.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.searchLabel = [...payload];
      state.searchTodo = null;
    },
    [searchLabels.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
    //라벨추가를 위한 라벨 값 읽어오는 기능
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

export const { initialTodos, addTodo, deleteTodo, initTodo } =
  postSlice.actions;
export default postSlice.reducer;
