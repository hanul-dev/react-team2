import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";
import axios from "axios";

const init = {
  comments: {},
};

const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
});

export const getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const postData = await instance.get("/posts");
      const result = postData.data.filter((e) => {
        return e.id === parseInt(payload, 10);
      });

      const commentsData = await instance.get("/comments");
      const postComments = commentsData.data.filter(
        (e) => e.postId === parseInt(payload, 10)
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
      // 에러처리
      // 로딩도 못잡아주고
      // 신뢰성 있는 화면
      // 실제로 서버에 들어간 값으로 구현을 해야한다. 눈속임 말고
      // 당연히 될거라고 생각하고 화면을 보여줄 수 있지만
      // 로딩과 예외처리를 확실하게 하는 개발자
      // 에러메세지에 따라서 처리가 달라지는 경우
    },
    deleteComments: (state, action) => {
      instance.delete(`/comments/${action.payload}`);
      state.comments.comments = state.comments.comments.filter((e) => {
        console.log(e.id);
        console.log(action.payload);
        return e.id !== action.payload;
      });
    },
    updateComments: (state, action) => {
      const { id, updateText } = action.payload;
      const findComments = state.comments.comments.map((comment) => {
        if (comment.id === id) {
          return { ...comment, text: updateText };
        } else {
          console.log(current(comment));
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
