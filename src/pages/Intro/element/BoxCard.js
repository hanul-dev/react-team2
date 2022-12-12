import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../../redux/modules/postSlice";
import Button from "../../../ui/Button";
import Card from "../../../ui/Card";

const BoxCard = ({ el }) => {
  const dispatch = useDispatch();
  return (
    <Card
      border="1px solid red"
      radius="12px"
      bgColor="whiteSmoke"
      shadow="inset 2px 2px 3px #333"
    >
      {el.title}
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
