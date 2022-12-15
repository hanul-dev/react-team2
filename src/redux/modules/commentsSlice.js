import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const init = {
  comments: {},
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_FRONT_BASE_URL,
  timeout: 1000,
});

export const getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const postData = await instance.get("/posts");
      const result = postData.data.filter((e) => {
        return e.id === payload;
      });

      const commentsData = await instance.get("/comments");
      const postComments = commentsData.data.filter(
        (e) => e.postId === payload
      );

      const resultData = { ...result[0], comments: postComments };
      return thunkAPI.fulfillWithValue(resultData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: init,
  reducers: {
    addComments: (state, action) => {
      instance.post("/comments", action.payload);
      state.comments.comments.push(action.payload);
    },
    deleteComments: (state, action) => {
      instance.delete(`/comments/${action.payload}`);
      state.comments.comments = state.comments.comments.filter((e) => {
        return e.id !== action.payload;
      });
    },
    updateComments: (state, action) => {
      const { id, updateText } = action.payload;
      const findComments = state.comments.comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, text: updateText };
        } else {
          return current(comment);
        }
      });
      state.comments.comments = findComments;
      instance.patch(`/comments/${id}`, {
        text: updateText,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state, action) => {});
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
    builder.addCase(getComments.rejected, (state, action) => {});
  },
});

export const { addComments, deleteComments, updateComments } =
  commentsSlice.actions;
export default commentsSlice.reducer;
