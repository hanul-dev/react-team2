import React, { useState } from "react";

const useInput = (a) => {
  const [input, setInput] = useState(
    a ?? {
      title: "",
      content: "",
    }
  );
  const changeHander = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  return [input, setInput, changeHander];
};

export default useInput;
