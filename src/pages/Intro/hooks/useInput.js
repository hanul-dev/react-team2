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
  return [input, changeHander];
};

export default useInput;

// 유틸로 만들자니 상태관리 작업을 또 해줘야되고
// useEffect로 하자니 요청마다 렌더링 쳐되고
// 훅 + 유틸 => 상태 / 에러처리 / 로딩화면(훅)
// axios 유틸
