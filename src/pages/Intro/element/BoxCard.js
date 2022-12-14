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
      height="200px"
      radius="12px"
      bgColor="whiteSmoke"
      direction="column"
    >
      <Box>
        <Label event="none">{el.label}</Label>
        <NavLink to={`/detail/${el.id}`}>
          <>상세보기</>
        </NavLink>
      </Box>
      <Box>{el.title}</Box>
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
