import React, { useEffect, useState } from "react";
import Box from "../../ui/Box";
import Button from "../../ui/Button";
import BoxCard from "./element/BoxCard";
import Input from "../../ui/Input";
import { useSelector } from "react-redux";
import { useAxios } from "./hooks/useAxios";
import useInput from "./hooks/useInput";
import Modal from "./element/Modal";

const Intro = () => {
  const [openModal, setOpenModal] = useState(false);
  const { error, isLoading, getData } = useAxios("posts");
  const [input, changeHander] = useInput({});
  const todolist = useSelector((state) => state.postReducer.todo);

  useEffect(() => {
    getData();
  }, []);

  const onClickHandler = () => {
    setOpenModal(true);
  };

  return (
    <Box width="80%" border="1px solid red" direction="column">
      {isLoading ? <p>로딩중이야</p> : <></>}
      {error ? <p>에러야</p> : <></>}
      <Modal
        modal={openModal}
        onClick={() => {
          setOpenModal(false);
        }}
      />
      {!isLoading ? (
        <>
          <Box width="100%" height="100px" border="1px solid blue" />
          <Box
            width="100%"
            direction="column"
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
              <Input
                width="90%"
                holder="제목"
                value={input.title}
                name="title"
                change={changeHander}
              ></Input>
              <Box bgColor="yellow" height="80%" width="40%" margin="0">
                Label
              </Box>
              <Button onClick={onClickHandler}>Icon</Button>
            </Box>
            <Box>
              {todolist.map((el, i) => {
                return <BoxCard key={`box${i}`} el={el} />;
              })}
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Intro;
