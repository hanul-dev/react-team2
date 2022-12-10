import React, { useEffect, useState } from "react";
import Box from "../../ui/Box";
import Modal from "./element/Modal";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import axios from "axios";
import BoxCard from "./element/BoxCard";
import useInput from "./hooks/useInput";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "X-Custom-Header": "foobar" },
  timeout: 1000,
});

const Intro = () => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState([]);
  const [input, setInput, changeHander] = useInput({});

  const getData = async () => {
    const { data } = await instance.get("/posts");
    setValue(data);
  };

  const postData = () => {
    const doc = {
      ...input,
      createdAt: Date.now(),
    };
    if (doc) instance.post("/posts", doc);
    setInput({ title: "", content: "" });
    setValue([...value, doc]);
    setOpenModal(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const onClickHandler = () => {
    setOpenModal(true);
  };
  return (
    <Box width="80%" border="1px solid red" direction="column">
      <Modal
        modal={openModal}
        onClick={() => {
          setOpenModal(false);
        }}
      >
        <h1>New Tesk</h1>
        <Box
          direction="column"
          justify="flex-start"
          align="flex-start"
          padding="10px"
        >
          <label>title</label>
          <Input
            width="90%"
            holder="제목"
            value={input.title}
            name="title"
            change={changeHander}
          ></Input>
          <label>contents</label>
          <Input
            width="90%"
            height="40%"
            holder="내용"
            value={input.content}
            name="content"
            change={changeHander}
          ></Input>
          <Box>Label</Box>
        </Box>
        <Box>
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close
          </Button>
          <Button onClick={postData}>Create</Button>
        </Box>
      </Modal>
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
          <Box bgColor="yellow" height="80%" width="40%" margin="0">
            Label
          </Box>
          <Button onClick={onClickHandler}>Icon</Button>
        </Box>
        <Box>
          {value.map((el, i) => {
            return <BoxCard key={`box${i}`} el={el} setValue={setValue} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
