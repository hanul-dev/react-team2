import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addData } from "../../../redux/modules/postSlice";
import Box from "../../../ui/Box";
import Validation from "../../../ui/Validation";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Label from "../../../ui/Label";
import useInput from "../hooks/useInput";
import useValidation from "../hooks/useValidation";
import { v4 as uuidv4 } from "uuid";

const Modal = ({ modal, onClick }) => {
  const { input, changeHandler, label, changeLabel, reset } = useInput();
  const { isValid, lengthCheck, validReset } = useValidation();
  const [ labelValid, setLabelValid] = useState(false);
  const dispatch = useDispatch();

  const onCreateHandler = () => {
    if (isValid.title && isValid.content && labelValid) {
      const today = new Date();
      const createdAt = today.toLocaleDateString("ko", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const doc = { ...input, id: uuidv4(), createdAt, label };
      dispatch(addData(doc));
      onClick();
      
      // Reset valids of Posting
      reset();
      validReset();
      setLabelValid(false);
    }
  };

  const closeModalHandler = () => {
    onClick();
    
    // Reset valids of Posting
    reset();
    validReset();
    setLabelValid(false);
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
                  change={changeHandler}
                  keyup={(e) => lengthCheck("title", input.title, 10)}
                ></Input>
                {!isValid.title && (
                  <Validation>
                    제목은 2자이상 10자 이하로 입력해주세요.
                  </Validation>
                )}
                <label htmlFor="content">contents</label>
                <Input
                  width="100%"
                  height="40%"
                  holder="내용"
                  id="content"
                  value={input.content}
                  name="content"
                  change={changeHandler}
                  keyup={(e) => lengthCheck("content", input.content, 30)}
                ></Input>
                {!isValid.content && (
                  <Validation>
                    내용은 2자이상 30자 이하로 입력해주세요.
                  </Validation>
                )}
                <label>Add label</label>
                <Box height="10%" justify="space-around">
                  <Label value={label} onClick={() => {
                    changeLabel("Redux");
                    setLabelValid(true);
                  }}>Redux</Label>
                  <Label value={label} onClick={() => {
                    changeLabel("React");
                    setLabelValid(true);
                  }}>React</Label>
                  <Label value={label} onClick={() => {
                    changeLabel("Javascript");
                    setLabelValid(true);
                  }}>
                    Javascript
                  </Label>
                  {!labelValid && (
                    <Validation>
                      라벨을 선택해주세요.
                    </Validation>
                  )}
                </Box>
              </Box>
              <Box height="10%" justify="flex-end">
                <Button onClick={closeModalHandler}>Close</Button>
                <Button onClick={onCreateHandler}>Create</Button>
              </Box>
            </Box>
          </StModal>
          <StBackDrop {...styles} onClick={closeModalHandler}></StBackDrop>
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