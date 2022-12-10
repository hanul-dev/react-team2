import { createSlice } from "@reduxjs/toolkit";

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
      state.todo = [...state.todo, action.payload];
    },
  },
});

export const { initialTodos, addTodo } = postSlice.actions;
export default postSlice.reducer;
