import {
  createAsyncThunk,
  createSlice,
  current,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localho123st:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});
// 검색기능을 해야하니까 일단 db에서 title을 매칭시켜야되겠다.
// db의 모든 글을 가져와서 내가 검색한 title이랑 비교해서 맞으면 state로 return해야겠다.
export const searchData = createAsyncThunk(
  "postSlice/searchData",
  async (title, thunkAPI) => {
    try {
      const res = await instance.get("/posts");
      const result = await res.data.filter((el) => el.title === title);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
console.log(searchData);
const initial = {
  todo: [],
  searchTodo: [],
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
    [searchData.pending]: (state, { payload }) => {},
    [searchData.fulfilled]: (state, { payload }) => {
      state.searchTodo = [...payload];
    },
    [searchData.rejected]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { initialTodos, addTodo, deleteTodo } = postSlice.actions;
export default postSlice.reducer;
