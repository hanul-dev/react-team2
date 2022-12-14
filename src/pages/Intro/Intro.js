import React, { useEffect, useState } from "react";
import Box from "../../ui/Box";
import Button from "../../ui/Button";
import BoxCard from "./element/BoxCard";
import Input from "../../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../ui/Label";
import useInput from "./hooks/useInput";
import Modal from "./element/Modal";
import {
  searchData,
  searchLabels,
  initTodo,
  getData,
} from "../../redux/modules/postSlice";

const Intro = () => {
  const [openModal, setOpenModal] = useState(false);
  const { input, changeHandler, reset } = useInput();
  const {
    todo: todolist,
    searchTodo,
    searchLabel,
    isloading,
    error,
  } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const onClickHandler = () => {
    setOpenModal(true);
  };

  const enterKeyHandler = (e) => {
    if (window.event.keyCode === 13) {
      dispatch(searchData(input.search));
      reset();
    }
  };
  const enterData = async (e) => {
    dispatch(searchData(input.search));
    reset();
  };
  const onSearchLabelHandler = async (e) => {
    dispatch(searchLabels(e.target.id));
  };
  return (
    <Box width="80%" direction="column">
      {isloading ? <p>로딩중이야</p> : <></>}
      {error ? <p>에러야</p> : <></>}
      <Modal
        modal={openModal}
        onClick={() => {
          setOpenModal(false);
        }}
        event="none"
      />
      {!isloading ? (
        <>
          <Box justify="flex-start" width="100%" height="60px">
            My Board
          </Box>
          <Box
            width="100%"
            direction="column"
            height="80vh"
            border="1px solid"
            radius="8px"
            align="center"
          >
            <Box
              height="120px"
              display="flex"
              justify="space-between"
              padding="0px 20px"
            >
              <Box direction="column" margin="0" width="70%" align="flex-start">
                <Input
                  width="80%"
                  height="40%"
                  holder="Keyword"
                  value={input.search}
                  name="search"
                  change={changeHandler}
                  keyup={enterKeyHandler}
                ></Input>
              </Box>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button width="80px" onClick={enterData}>
                  Enter
                </Button>
                <Button
                  width="80px"
                  onClick={() => {
                    dispatch(initTodo());
                  }}
                >
                  전체 보기
                </Button>
              </div>
            </Box>
            <Box
              width="100%"
              height="80px"
              bgColor="white"
              justify="space-between"
              padding="0px 20px"
            >
              <Box
                justify="space-around"
                border="1px solid"
                height="70%"
                width="40%"
                margin="0"
              >
                <Label id="Redux" onClick={onSearchLabelHandler}>
                  Redux
                </Label>
                <Label id="React" onClick={onSearchLabelHandler}>
                  React
                </Label>
                <Label id="Javascript" onClick={onSearchLabelHandler}>
                  Javascript
                </Label>
              </Box>
              <Button width="80px" onClick={onClickHandler}>
                추가
              </Button>
            </Box>

            <Box
              flexWrap="wrap"
              display={searchTodo !== null ? "flex" : "none"}
            >
              {searchTodo?.length > 0 ? (
                searchTodo?.map((el, i) => {
                  return <BoxCard key={`box${i}`} el={el} />;
                })
              ) : (
                <p>검색결과가 없습니다.</p>
              )}
            </Box>
            <Box
              display={searchLabel !== null ? "flex" : "none"}
              flexWrap="wrap"
            >
              {searchLabel?.length > 0 ? (
                searchLabel?.map((el, i) => {
                  return <BoxCard key={`box${i}`} el={el} />;
                })
              ) : (
                <p>검색결과가 없습니다.</p>
              )}
            </Box>
            <Box
              display={
                searchLabel === null && searchTodo === null ? "flex" : "none"
              }
              flexWrap="wrap"
            >
              {todolist?.length > 0 ? (
                todolist?.map((el, i) => {
                  return <BoxCard key={`box${i}`} el={el} />;
                })
              ) : (
                <p>등록된 콘텐츠가 없습니다.</p>
              )}
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
