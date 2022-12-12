import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});

const initial = {
  todo: [],
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
});

// 댓글 중간 미들웨어 thunk 로직처리가 필요
// 좋은 패턴일까?
// 윤 매니저님 : 로직이 한군데에서 관리되서 유지보수에 용이하도록
//              thunk에서 관리되었을때 에러처리되었을 때
// form에 만들 수 있는 훅? : 유효성(value => 검사 => return [value, message])

export const { initialTodos, addTodo, deleteTodo } = postSlice.actions;
export default postSlice.reducer;
