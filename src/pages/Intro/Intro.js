import React, { useEffect, useState } from "react";
import Box from "../../ui/Box";
import Button from "../../ui/Button";
import BoxCard from "./element/BoxCard";
import Input from "../../ui/Input";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../ui/Label";
import useInput from "./hooks/useInput";
import Modal from "./element/Modal";
import Loading from "./../LoadingPage/Loading";
import styled from "styled-components";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import DownloadIcon from "@mui/icons-material/Download";
import LoupeIcon from "@mui/icons-material/Loupe";
import {
  searchData,
  searchLabels,
  initTodo,
  getData,
} from "../../redux/modules/postSlice";
import ErrorPage from "../ErrorPage/ErrorPage";

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
    <Box width="100%" direction="column" overflow="hidden">
      {isloading ? <Loading /> : <></>}
      {error ? <ErrorPage /> : <></>}
      <Modal
        modal={openModal}
        onClick={() => {
          setOpenModal(false);
        }}
        event="none"
      />

      {/* nav */}
      {!isloading && !error ? (
        <>
          <StyledIntroNav>
            <StyledIntroSearchWrapper>
              <span>My Board</span>

              <Input
                width="100%"
                height="100%"
                holder="Search"
                value={input.search}
                name="search"
                change={changeHandler}
                keyup={enterKeyHandler}
                border="none"
              ></Input>
            </StyledIntroSearchWrapper>
            <div style={{ display: "flex", gap: "10px" }}>
              <StyledIconButton width="80px" onClick={enterData}>
                <SavedSearchIcon />
              </StyledIconButton>
              <StyledIconButton
                width="80px"
                onClick={() => {
                  dispatch(initTodo());
                }}
              >
                <Button>All</Button>
              </StyledIconButton>
            </div>
          </StyledIntroNav>

          {/* contents */}
          <Box
            width="100%"
            direction="column"
            height="100vh"
            radius="8px"
            align="center"
          >
            <Box
              width="100%"
              height="40px"
              bgColor="white"
              justify="space-between"
              padding="0px 20px"
            >
              <Box
                display="flex"
                justify="space-around"
                gap="10px"
                height="70%"
                width="20%"
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
              <StyledIconButton onClick={onClickHandler}>
                <LoupeIcon />
              </StyledIconButton>
            </Box>

            <Box
              flexWrap="wrap"
              gap="40px"
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
              gap="40px"
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
              gap="40px"
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

const StyledIntroNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 5px -5px #333;
  position: sticky;
  padding: 5px 20px;
  margin-bottom: 10px;
`;

const StyledIntroSearchWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const StyledIconButton = styled.div`
  display: initial;
  color: #48404d;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.2);
  }
`;
