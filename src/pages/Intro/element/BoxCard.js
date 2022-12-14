import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteTodo } from "../../../redux/modules/postSlice";
import Box from "../../../ui/Box";
import Button from "../../../ui/Button";
import Card from "../../../ui/Card";
import Label from "../../../ui/Label";

const BoxCard = ({ el }) => {
  const dispatch = useDispatch();
  return (
    <Card
      width="250px"
      height="300px"
      radius="12px"
      padding="0 10px"
      direction="column"
      justify="flex-start"
    >
      <Box direction="row" justify="space-between" height="15%" padding="15px 0 0">{el.createdAt}
        <NavLink to={`/detail/${el.id}`}>
          <Button width="80px">상세보기</Button>
        </NavLink>
      </Box>
      <Box height="20%" justify="space-between">{el.title}
        <Label event="none">{el.label}</Label>
      </Box>
      <Box height="50%" justify="flex-start">{el.content}</Box>
    
      <Button
        onClick={() => {
          dispatch(deleteTodo(el.id));
        }}
      >
        삭제
      </Button>
    </Card>
  );
};

export default BoxCard;
