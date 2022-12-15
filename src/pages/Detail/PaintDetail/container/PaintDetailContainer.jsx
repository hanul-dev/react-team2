import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "../../../../ui/Label";

import {
  getData,
  getDelData,
  updateData,
} from "../../../../redux/modules/detailSlice";
import { useNavigate } from "react-router-dom";

const PaintDetailContainer = ({ postId }) => {
  const state = useSelector((state) => state.detailReducer.posts);
  const navigate = useNavigate();
  const textarea = useRef();
  const [updateMode, setUpdateMode] = useState(false);
  const [reTitle, setReTitle] = useState("");
  const [reContent, setReContent] = useState("");
  const titleChangeHandler = (e) => {
    setReTitle(e.target.value);
  };
  const contentChangeHandler = (e) => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    setReContent(e.target.value);
  };
  const deleteOnclickHandler = (id) => {
    dispatch(getDelData(id));
    navigate("/");
  };
  const updateOnclickHandler = (title, content) => {
    if (updateMode === false) {
      setUpdateMode(!updateMode);
      setReTitle(title);
      setReContent(content);
    } else {
      setUpdateMode(!updateMode);
      dispatch(updateData({ title: reTitle, content: reContent, postId }));
    }
  };
  const { title, content, id, label } = state[0] ?? {
    title: "",
    content: "",
    createdAt: "",
    id: 0,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData(postId));
  }, [dispatch, postId]);
  return (
    <StyledPaintDetailcontainer>
      <StyledPaintDetailLogo>
        {/* <div>
          <span>{id}</span>
        </div> */}
        {/* uuid는 식별용인데 화면에 노출되는게 자연스럽지 못하다는 생각이 들어 주석처리 했습니다. */}
        <div style={{ display: "flex", gap: "10px" }}>
          <StyledIconButton onClick={() => deleteOnclickHandler(postId)}>
            <DeleteIcon />
          </StyledIconButton>
          <StyledIconButton
            onClick={() => updateOnclickHandler(title, content)}
          >
            <AutoFixHighIcon />
          </StyledIconButton>
        </div>
      </StyledPaintDetailLogo>
      <StyledPaintDetailTitle>
        {updateMode === true ? (
          <StyledUpdateInput
            value={reTitle}
            onChange={(e) => titleChangeHandler(e)}
            maxLength={25}
          />
        ) : (
          <span style={{ marginLeft: "10px" }}>{title}</span>
        )}
      </StyledPaintDetailTitle>
      <StyledPaintDetailContentsWrapper>
        <div>
          <Label style={{ flexGrow: "2" }}>{label}</Label>
        </div>
        <StyledPaintDetailContents>
          {updateMode === true ? (
            <StyledUpdateTextarea
              value={reContent}
              onChange={(e) => contentChangeHandler(e)}
              ref={textarea}
              rows={1}
            />
          ) : (
            <div>{content}</div>
          )}
        </StyledPaintDetailContents>
      </StyledPaintDetailContentsWrapper>
    </StyledPaintDetailcontainer>
  );
};

export default PaintDetailContainer;

const StyledPaintDetailcontainer = styled.div`
  width: 100%;
  height: 65%;
  border: 2px solid #f9d6d4;
  border-radius: 15px;
  color: #48404d;
  text-align: left;
  overflow: hidden;
`;

const StyledPaintDetailLogo = styled.div`
  width: 100%;
  height: 7%;
  min-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f9d6d4;
  background: white;

  padding: 0px 20px;
  &::before {
    content: "Detail Page";
    color: #48404d;
  }
`;

const StyledPaintDetailTitle = styled.div`
  width: 100%;
  height: 7%;
  min-height: 30px;
  border-bottom: 2px solid #f9d6d4;
  background: white;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  &::before {
    content: "Title : ";
    color: #48404d;
  }
`;

const StyledUpdateInput = styled.input`
  width: 70%;
  height: 80%;
  border: none;
  background: #f9d6d4;
  border-radius: 5px;
  padding: 0px 10px;
  margin-left: 10px;
  color: #48404d;
`;

const StyledIconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #48404d;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledPaintDetailContentsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 20px;
  background: white;
`;

const StyledPaintDetailContents = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 50%;
  &::before {
    content: "TextContents : ";
    color: #48404d;
  }
`;

const StyledUpdateTextarea = styled.textarea`
  width: 100%;
  border: none;
  background: #f9d6d4;
  border-radius: 5px;
  padding: 0px 10px;
  color: #48404d;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  resize: none;
`;