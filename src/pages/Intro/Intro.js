import React, { useEffect, useState } from "react";
import Box from "../../ui/Box";
import Button from "../../ui/Button";
import BoxCard from "./element/BoxCard";
import Input from "../../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "./hooks/useAxios";
import useInput from "./hooks/useInput";
import Modal from "./element/Modal";
import { searchData } from "../../redux/modules/postSlice";

const Intro = () => {
  const [openModal, setOpenModal] = useState(false);
  const { error, isLoading, getData } = useAxios();
  const [input, changeHander] = useInput({});
  const { todo: todolist, searchTodo } = useSelector(
    (state) => state.postReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getData("posts");
  }, []);

  const onClickHandler = () => {
    setOpenModal(true);
  };
  const enterKeyHandler = async (e) => {
    console.log(window.event.keyCode);
    if (window.event.keyCode === 13) {
      dispatch(searchData(input.search));
    }
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
            align="center"
          >
            <Input
              width="90%"
              height="2rem"
              margin="5px"
              holder="검색"
              value={input.search}
              name="search"
              change={changeHander}
              keyup={enterKeyHandler}
            ></Input>
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
              <Button onClick={onClickHandler}>Icon</Button>
            </Box>
            <Box>
              {searchTodo.length > 0
                ? searchTodo.map((el, i) => {
                    return <BoxCard key={`box${i}`} el={el} />;
                  })
                : todolist.map((el, i) => {
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
