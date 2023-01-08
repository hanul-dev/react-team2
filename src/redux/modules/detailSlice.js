import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});
const todo = {
  posts: [],
  isLoading: true,
  errorCurse: false,
  status: 0,
};
export const getData = createAsyncThunk(
  "detailSlice/getData",
  async (action, thunkAPI) => {
    const data = await instance.get("/posts");
    const result = data.data.filter((el) => el.id === action);
    return result;
  }
);

export const getDelData = createAsyncThunk(
  "detailSlice/getDelData",
  async (action, thunkAPI) => {
    try {
      const data = await instance.delete(`/posts/${action}`);
      const result = data.status;
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const detailSlice = createSlice({
  name: "detailSlice",
  initialState: todo,
  reducers: {
    updateData: (state, action) => {
      const { title, content, postId } = action.payload;
      instance.patch(`/posts/${postId}`, { title: title, content: content });
      state.posts[0] = { title: title, content: content };
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorCurse = false;
      state.posts = payload;
    },
    [getData.rejected]: (state, { payload }) => {
      state.errorCurse = true;
    },
    [getDelData.pending]: (state) => {
      state.isLoading = true;
    },
    [getDelData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.errorCurse = false;
      state.status = payload;
    },
    [getDelData.rejected]: (state, { payload }) => {
      state.errorCurse = true;
    },
  },
});

export const { dataTodo, deleteData, updateData } = detailSlice.actions;
export default detailSlice.reducer;
