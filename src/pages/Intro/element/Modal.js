import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addTodo } from "../../../redux/modules/postSlice";
import Box from "../../../ui/Box";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Label from '../../../ui/Label';
import useInput from "../hooks/useInput";

const Modal = ({ modal, onClick }) => {
  const [input, changeHander, label, changeLabel] = useInput({});
  const dispatch = useDispatch();

  const onCreateHandler = () => {
    // console.log(label);
    const today = new Date();
    const createdAt = today.toLocaleString("ko");
    const doc = { ...input, createdAt, label };
    dispatch(addTodo(doc));
    onClick();
  };

  const styles = { modal };
  return (
    <>
      {ReactDOM.createPortal(
        <Fragment>
          <StModal {...styles}>
            <Box direction="column">
              <h3>New Tesk</h3>
              <Box
                direction="column"
                justify="flex-start"
                align="flex-start"
                padding="10px"
              >
                <label>title</label>
                <Input
                  width="90%"
                  holder="제목"
                  value={input.title}
                  name="title"
                  change={changeHander}
                ></Input>
                <label>contents</label>
                <Input
                  width="90%"
                  height="40%"
                  holder="내용"
                  value={input.content}
                  name="content"
                  change={changeHander}
                ></Input>
                <label>Add label</label>
                <Box justify="center">
                  <Label justify="center" align="center" onClick={() => changeLabel("Redux")} value={"Redux"}>Redux</Label>
                  <Label justify="center" align="center" onClick={() => changeLabel("React")} value={"React"}>React</Label>
                  <Label justify="center" align="center" onClick={() => changeLabel("Javascript")} value={"Javascript"}>Javascript</Label>
                </Box>
              </Box>
              <Box height="25%" justify='flex-end'>
                <Button
                  onClick={() => {
                    onClick();
                  }}
                >
                  Close
                </Button>
                <Button onClick={onCreateHandler}>Create</Button>
              </Box>
            </Box>
          </StModal>
          <StBackDrop {...styles} onClick={onClick}></StBackDrop>
        </Fragment>,
        document.getElementById("root")
      )}
    </>
  );
};

export default Modal;

// label => 유틸? 훅?
// 리액트에서 use 파일앞에 => 그 함수안에서는 리액트 훅을 사용할 수 있음.
// 리액트 훅은 컴포넌트 함수, use가 붙은 함수에서만 사용 가능

// 라벨을 유틸로 => 라벨을 누르면 전역 상태가 변경되게
// 라벨을 눌렀을 때 값을 받아오는(axios get) 유틸
// axios get요청 response가 리듀서 or thunk 상태로 저장
// => 렌더링

// 훅 만들고 => response return => 화면 렌더링

const StModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal ? "flex" : "none";
  }};
  width: 400px;
  height: 300px;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 12px;
  box-shadow: 1px 1px 3px black;
`;

const StBackDrop = styled.div`
  position: fixed;
  margin: 0;
  padding: 0;
  display: ${({ modal }) => {
    return modal ? "block" : "none";
  }};
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(141, 141, 141, 0.3);
`;
