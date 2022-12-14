import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getData,
  getDelData,
  updateData,
} from "../../../../redux/modules/detailSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PaintDetailContainer = ({ postId }) => {
  const pageStatus = useSelector((state) => state.detailReducer.posts).status;
  const state = useSelector((state) => state.detailReducer.posts);
  console.log(state);
  const navigate = useNavigate();
  // if (pageStatus === 200) {
  //   console.log("1");

  // }

  const [updateMode, setUpdateMode] = useState(false);
  const [reTitle, setReTitle] = useState("");
  const [reContent, setReContent] = useState("");
  const titleChangeHandler = (e) => {
    setReTitle(e.target.value);
  };
  const contentChangeHandler = (e) => {
    setReContent(e.target.value);
  };
  const deleteOnclickHandler = (id) => {
    dispatch(getDelData(id));
    navigate("/");
  };
  const updateOnclickHandler = (title, content) => {
    if (updateMode === false) {
      console.log(reTitle, reContent);
      console.log(title, content);
      setUpdateMode(!updateMode);
      setReTitle(title);
      setReContent(content);
    } else {
      setUpdateMode(!updateMode);

      dispatch(
        updateData({ title: reTitle, content: reContent, postId: postId })
      );
    }
  };
  const { title, content, createdAt, id } = state[0] ?? {
    title: "",
    content: "",
    createdAt: "",
    id: 0,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData(postId));
  }, [dispatch]);
  return (
    <StyledPaintDetailcontainer>
      <div style={{ height: "5%", border: "1px solid green" }}>{id}</div>
      <div style={{ height: "10%", border: "1px solid red" }}>
        {updateMode === true ? (
          <input value={reTitle} onChange={(e) => titleChangeHandler(e)} />
        ) : (
          <span style={{ marginLeft: "10px", display: "flex" }}>{title}</span>
        )}
      </div>
      <div style={{ display: "flex", margin: "5px 0px 5px 0" }}>
        <div style={{ flexGrow: "2" }}>label</div>
        <div style={{ flexGrow: "1", width: "3%" }}>
          <button
            style={{ width: "50px", marginRight: "10px" }}
            onClick={() => deleteOnclickHandler(postId)}
          >
            삭제
          </button>
          <button
            style={{ width: "50px", marginRight: "10px" }}
            onClick={() => updateOnclickHandler(title, content)}
          >
            수정
          </button>
        </div>
      </div>
      {updateMode === true ? (
        <input value={reContent} onChange={(e) => contentChangeHandler(e)} />
      ) : (
        <div>{content}</div>
      )}
    </StyledPaintDetailcontainer>
  );
};

export default PaintDetailContainer;

const StyledPaintDetailcontainer = styled.div`
  width: 100%;
  height: 65%;
  border: 2px solid black;
`;
