import { createSlice } from "@reduxjs/toolkit";

const initial = {
  todo: [],
  done: [],
  notDone: [],
};
const postSlice = createSlice({
  name: "todo",
  initialState: initial,
  reducers: {
    initialTodos: (state, action) => {
      state.todo = action.payload;
    },
    addTodo: (state, action) => {
      console.log(action);
    },
  },
});

export const { initialTodos, addTodo } = postSlice.actions;
export default postSlice.reducer;
