import axios from "axios";
import React from "react";
import Button from "../../../ui/Button";
import Card from "../../../ui/Card";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});
const BoxCard = ({ el, setValue }) => {
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
          instance.delete(`/posts/${el.id}`);
          setValue((prev) => prev.filter((i) => i.id !== el.id));
        }}
      >
        삭제
      </Button>
    </Card>
  );
};

export default BoxCard;
