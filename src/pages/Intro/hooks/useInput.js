import React, { useState } from "react";

const useInput = (inputValue) => {
  const [input, setInput] = useState(
    inputValue ?? {
      title: "",
      content: "",
      search: "",
    }
  );
  const [label, setLabel] = useState("");
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const changeLabel = (label) => {
    setLabel(label);
  };
  const reset = () => {
    setInput({
      title: "",
      content: "",
      search: "",
    });
  };
  return { input, changeHandler, label, changeLabel, reset };
};

export default useInput;
