import React, { useState } from "react";

const useValidation = () => {
  const [isValid, setIsValid] = useState({ title: false, content: false });

  const lengthCheck = (input, words, max) => {
    if (2 <= words.length && words.length <= max) {
      setIsValid({ ...isValid, [input]: true });
    } else {
      setIsValid({ ...isValid, [input]: false });
    }
  };
  return { isValid, lengthCheck };
};

export default useValidation;
