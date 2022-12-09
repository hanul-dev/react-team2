import React, { useState } from "react";
import Box from "../../ui/Box";
import Modal from "./element/Modal";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
const Intro = () => {
  const [openModal, setOpenModal] = useState(false);
  const onClickHandler = () => {
    setOpenModal(true);
  };
  return (
    <Box width="80%" border="1px solid red" direction="column">
      <Modal
        modal={openModal}
        onClick={() => {
          setOpenModal(false);
        }}
      >
        <h1>New Tesk</h1>
        <Box
          direction="column"
          justify="flex-start"
          align="flex-start"
          padding="10px"
        >
          <label>title</label> <Input width="90%" holder="제목"></Input>
          <label>contents</label>{" "}
          <Input width="90%" height="40%" holder="내용"></Input>
          <Box>Label</Box>
        </Box>
        <Box>
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close
          </Button>
          <Button>Create</Button>
        </Box>
      </Modal>
      <Box width="100%" height="100px" border="1px solid blue" />
      <Box
        width="100%"
        height="80vh"
        border="1px solid purple"
        bgColor="grey"
        align="flex-start"
      >
        <Box
          width="100%"
          height="80px"
          bgColor="white"
          justify="space-between"
          padding="5px"
        >
          <Box bgColor="yellow" height="80%" width="40%" margin="0">
            Label
          </Box>
          <Box bgColor="yellow" height="80%" width="10%" margin="0">
            <Button onClick={onClickHandler}>Icon</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
