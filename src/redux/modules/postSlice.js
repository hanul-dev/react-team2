import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});

export const getData = createAsyncThunk(
  "postSlice/getData",
  async (data, thunkAPI) => {
    try {
      const res = await instance.get("/posts");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addData = createAsyncThunk(
  "postSlice/addData",
  async (data, thunkAPI) => {
    try {
      let result;
      const { search, ...doc } = data;
      const res = await instance.post("/posts", doc);
      if (res.request.status === 201) {
        result = await instance.get("/posts");
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ message: "등록실패" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteData = createAsyncThunk(
  "postSlice/deleteData",
  async (data, thunkAPI) => {
    try {
      let result;
      const res = await instance.delete(`/posts/${data}`);
      if (res.request.status === 200) {
        result = await instance.get("/posts");
        return result.data;
      } else {
        return thunkAPI.rejectWithValue({ message: "등록실패" });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

const initial = {
  todo: [],
  searchTodo: null,
  searchLabel: null,
  isloading: false,
  error: false,
};
const postSlice = createSlice({
  name: "todo",
  initialState: initial,
  reducers: {

    initTodo: (state, action) => {
      state.searchTodo = null;
      state.searchLabel = null;
    },
  },

  extraReducers: {
    //조회기능
    [getData.pending]: (state, action) => {
      state.isloading = true;
    },
    [getData.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.todo = [...payload];
    },
    [getData.rejected]: (state, action) => {
      state.isloading = false;
      state.error = true;
    },

    //추가기능
    [addData.pending]: (state, action) => {
      state.isloading = true;
    },
    [addData.fulfilled]: (state, { payload }) => {
      state.isloading = false;
      state.todo = payload;
    },
    [addData.rejected]: (state, action) => {
      state.isloading = false;
      state.error = true;
    },

    //삭제기능
    [deleteData.pending]: (state, action) => {
      state.isloading = true;
    },
    [deleteData.fulfilled]: (state, { payload }) => {
      state.searchTodo = null;
      state.searchLabel = null;
      state.isloading = false;
      state.todo = payload;
    },
    [deleteData.rejected]: (state, action) => {
      state.isloading = false;
      state.error = true;
    },

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
      state.error = true;
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
      state.error = true;
    },
  },
});

export const { initialTodos, addTodo, deleteTodo, initTodo } =
  postSlice.actions;
export default postSlice.reducer;
