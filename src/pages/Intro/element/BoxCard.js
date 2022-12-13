import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../../redux/modules/postSlice";
import Box from '../../../ui/Box';
import Button from "../../../ui/Button";
import Card from "../../../ui/Card";
import Label from '../../../ui/Label';

const BoxCard = ({ el }) => {
  const dispatch = useDispatch();
  return (
    <Card
      border="1px solid red"
      width="250px"
      height="200px"
      radius="12px"
      bgColor="whiteSmoke"
      shadow="inset 2px 2px 3px #333"
      direction="column"
    >
      <Box>
        <Label event="none">{el.label}</Label>
      </Box>
      <Box>
        {el.title}
      </Box>
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
