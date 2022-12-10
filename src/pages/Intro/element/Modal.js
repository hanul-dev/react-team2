import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addTodo } from "../../../redux/modules/postSlice";
import Box from "../../../ui/Box";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import useInput from "../hooks/useInput";

const Modal = ({ modal, onClick }) => {
  const [input, changeHandler, reset] = useInput({});
  const dispatch = useDispatch();

  const onCreateHandler = () => {
    const doc = { ...input, createdAt: Date.now() };
    dispatch(addTodo(doc));
    onClick();
    reset();
  };
  const closeHandler = () => {
    onClick();
    reset();
  }

  const styles = { modal };
  return (
    <>
      {ReactDOM.createPortal(
        <Fragment>
          <StModal {...styles}>
            <h1>New Tesk</h1>
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
                change={changeHandler}
              ></Input>
              <label>contents</label>
              <Input
                width="90%"
                height="40%"
                holder="내용"
                value={input.content}
                name="content"
                change={changeHandler}
              ></Input>
              <Box>Label</Box>
            </Box>
            <Box>
              <Button
                onClick={closeHandler}
              >
                Close
              </Button>
              <Button onClick={onCreateHandler}>Create</Button>
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
  box-shadow: 2px 2px 6px black;
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
  background-color: rgba(141, 141, 141, 0.8);
`;
