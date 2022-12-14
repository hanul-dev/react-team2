import React, { useEffect, useState } from "react";
import Box from "../../ui/Box";
import Button from "../../ui/Button";
import BoxCard from "./element/BoxCard";
import Input from "../../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "./hooks/useAxios";
import Label from "../../ui/Label";
import useInput from "./hooks/useInput";
import Modal from "./element/Modal";
import {
  searchData,
  getLabels,
  searchLabels,
  initTodo,
} from "../../redux/modules/postSlice";

const Intro = () => {
  const [openModal, setOpenModal] = useState(false);
  const { error, isLoading, getData } = useAxios();
  const { input, changeHandler, reset } = useInput();
  const {
    todo: todolist,
    searchTodo,
    labels,
    searchLabel,
  } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getData("posts");
    dispatch(getLabels());
  }, []);

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
      {isLoading ? <p>로딩중이야</p> : <></>}
      {error ? <p>에러야</p> : <></>}

      <Modal
        modal={openModal}
        onClick={() => {
          setOpenModal(false);
        }}
        event="none"
      />
      {!isLoading ? (
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
            <Box height="5rem" justify="flex-start">
              <Input
                width="50%"
                height="50%"
                margin="0 10px"
                justify=""
                holder="Keyword"
                value={input.search}
                name="search"
                change={changeHandler}
                keyup={enterKeyHandler}
              ></Input>
              <Button onClick={enterData}>Enter</Button>
              <Button
                onClick={() => {
                  dispatch(initTodo());
                }}
              >
                전체보기
              </Button>
            </Box>
            <Box
              width="100%"
              height="80px"
              bgColor="white"
              justify="space-between"
              padding="5px"
            >
              <Box
                justify="space-around"
                border="1px solid"
                height="70%"
                width="40%"
                margin="0"
              >
                {labels.map((label, index) => {
                  return (
                    <Label
                      key={index}
                      id={label.name}
                      onClick={onSearchLabelHandler}
                    >
                      {label.name}
                    </Label>
                  );
                })}
              </Box>
              <Button onClick={onClickHandler}>추가</Button>
            </Box>
            <Box display={searchTodo !== null ? "flex" : "none"}>
              {searchTodo?.length > 0 ? (
                searchTodo?.map((el, i) => {
                  return <BoxCard key={`box${i}`} el={el} />;
                })
              ) : (
                <p>검색결과가 없습니다.</p>
              )}
            </Box>
            <Box display={searchLabel !== null ? "flex" : "none"}>
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
