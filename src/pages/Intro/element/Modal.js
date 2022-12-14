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
  const [input, changeHander, label, changeLabel] = useInput({});
  const dispatch = useDispatch();

  const onCreateHandler = () => {
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
              <label htmlFor="title">title</label>
              <Input
                width="90%"
                holder="제목"
                id="title"
                value={input.title}
                name="title"
                change={changeHander}
              ></Input>
              <label htmlFor="content">contents</label>
              <Input
                width="90%"
                height="40%"
                holder="내용"
                id="content"
                value={input.content}
                name="content"
                change={changeHander}
              ></Input>
              <Box justify="flex-start">
                <Label onClick={() => changeLabel("Redux")}>Redux</Label>
                <Label onClick={() => changeLabel("React")}>React</Label>
                <Label onClick={() => changeLabel("Javascript")}>
                  Javascript
                </Label>
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
