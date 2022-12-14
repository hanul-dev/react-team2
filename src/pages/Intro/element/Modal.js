import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addTodo } from "../../../redux/modules/postSlice";
import Box from "../../../ui/Box";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Label from "../../../ui/Label";
import useInput from "../hooks/useInput";

const Modal = ({ modal, onClick }) => {
  const [input, changeHander, label, changeLabel, reset] = useInput({});
  const dispatch = useDispatch();

  const onCreateHandler = () => {
    const today = new Date();
    const createdAt = today.toLocaleDateString("ko",{year:'numeric', month:'long', day:'numeric',} );
    const doc = { ...input, createdAt, label };
    dispatch(addTodo(doc));
    onClick();
    reset();
  };

  const styles = { modal };
  return (
    <>
      {ReactDOM.createPortal(
        <Fragment>
          <StModal {...styles}>
            <Box direction="column" padding="10px 0">
            <h1>New Tesk</h1>
            <Box
              direction="column"
              justify="space-around"
              align="flex-start"
              padding="15px"
            >
              <label htmlFor="title">title</label>
              <Input
                width="100%"
                holder="제목"
                id="title"
                value={input.title}
                name="title"
                change={changeHander}
              ></Input>
              <label htmlFor="content">contents</label>
              <Input
                width="100%"
                height="40%"
                holder="내용"
                id="content"
                value={input.content}
                name="content"
                change={changeHander}
              ></Input>
              <label>Add label</label>
              <Box height="10%" justify="space-around">
                <Label onClick={() => changeLabel("Redux")}>Redux</Label>
                <Label onClick={() => changeLabel("React")}>React</Label>
                <Label onClick={() => changeLabel("Javascript")}>
                  Javascript
                </Label>
              </Box>
            </Box>
            <Box height="10%" justify='flex-end'>
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
  height: 400px;
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
