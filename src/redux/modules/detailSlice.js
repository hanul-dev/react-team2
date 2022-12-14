import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  // 2
  baseURL: "http://localhost:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});
const todo = {
  //초기값 1.
  posts: [],
  isLoading: true,
  errorCurse: false,
  status: 0,
};
export const getData = createAsyncThunk(
  //5 함수 안에 넣어줌
  "detailSlice/getData",
  async (action, thunkAPI) => {
    //6
    //비동기작업시작
    //try {

    const data = await instance.get("/posts"); // 9 서버에서 데이터 받아오기
    const result = data.data.filter((el) => el.id === action); // 10 원하는 모양으로 데이터 가공
    return result; //11 가공한 데이터를 사용하기 위해 반환
    // } catch (err) {}
  }
);

// redirect를 하기 위한 로직
// 제한사항 : 지금은 서버가 없어서 빽에서 리디렉트 해줄 수 없다.
//           빽에서 status에 따른 처리로 response로 담아 줄 수 없다.(json server가 빡대가리여서)
// 내가 필요한 정보는 서버에서 삭제가 잘 되었다면 리디렉트를 하고 싶기때문에 잘 삭제되었다. 라는 정보이다.
// 이 정보는 json server가 보내주는 response의 status를 통해서 알 수 있다.$
// status가 200 이면 성공 / 404면 클라이언트 이슈 / 500이면 서버 이슈
// 나는 성공하면 리다이렉트를 진행할 거기 때문에 200인 값을 컴포넌트 함수에서 useSelector로 뽑아서 그 값이 200일 때 리다이렉트 시켜줄 거다.
export const getDelData = createAsyncThunk(
  "detailSlice/getDelData",
  async (action, thunkAPI) => {
    console.log(action);
    // pending
    try {
      const data = await instance.delete(`/posts/${action}`);
      console.log(data);
      const result = data.status;
      return result; //fulfilled
    } catch (err) {
      return thunkAPI.rejectWithValue(err); // rejected 분류하기위한 함수예요.
    }
  }
);
// dispatch => thunk => thunk함수 시작과 동시에 pending 함수 호출
//비동기 작업 끝나고 return과 동시에 fulfilled 호출
// API.rejectWithValue() 호출시 fullfilled 호출 안하고 대신 rejected 호출
// => 각각의 함수의 return값은 reducer에서 관리하는 state로 감.
// => state를 사용하려면 useselector로만.
const detailSlice = createSlice({
  //3
  name: "detailSlice", //3
  initialState: todo, //3
  reducers: {
    updateData: (state, action) => {
      const { title, content, postId } = action.payload;
      instance.patch(`/posts/${postId}`, { title: title, content: content }); //db 수정
      state.posts[0] = { title: title, content: content };
    },
  }, //3
  extraReducers: {
    //4 12
    [getData.pending]: (state) => {
      //12
      state.isLoading = true;
    },
    [getData.fulfilled]: (state, { payload }) => {
      //12
      console.log(state); //불변성으로 Proxy 로 나옴 => 해결방법 : current
      console.log(current(state));
      state.isLoading = false; //서버통신 끝나서 false
      state.errorCurse = false;
      state.posts = payload;
    },
    [getData.rejected]: (state, { payload }) => {
      //state = slice의 상태값(todo, payload = getDate 에서 return 하는 result 값이 들어감
      //12
      state.errorCurse = true;
    }, //4 12
    [getDelData.pending]: (state) => {
      //12
      state.isLoading = true;
    },
    [getDelData.fulfilled]: (state, { payload }) => {
      //12
      state.isLoading = false; //서버통신 끝나서 false
      state.errorCurse = false;
      console.log(payload);
      state.status = payload;
    },
    [getDelData.rejected]: (state, { payload }) => {
      //12
      state.errorCurse = true;
    },
  },
});

export const { dataTodo, deleteData, updateData } = detailSlice.actions;
export default detailSlice.reducer;
