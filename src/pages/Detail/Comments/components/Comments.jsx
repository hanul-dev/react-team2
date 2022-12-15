import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Comments = ({
  comments,
  onAddComments,
  postId,
  onDeleteComments,
  onUpdateComments,
}) => {
  const [commentInput, setCommentInput] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [updateText, setUpdateText] = useState("");

  const CommentsFormSubmitHandler = (event) => {
    event.preventDefault();
    const date = new Date();
    const time = date.toLocaleTimeString("ko");
    const commentsData = {
      postId: postId,
      text: commentInput,
      createAt: time,
      id: uuidv4(),
    };
    onAddComments(commentsData);
    setCommentInput("");
  };

  const commentChangeHandler = (event) => {
    const { value } = event.target;
    setCommentInput(value);
  };
  const commentDeleteButtonHandler = (id) => {
    onDeleteComments(id);
  };
  const updateButtonHandler = (id, text) => {
    if (!updateId) {
      setUpdateId(id);
      setUpdateText(text);
    } else {
      setUpdateId("");
      onUpdateComments({ id, updateText });
    }
  };
  const updateInputHandler = (event) => {
    setUpdateText(event.target.value);
  };

  return (
    <StyledCommentsContainer>
      <StyledComments>
        {comments?.map((comment) => {
          return (
            <StyledComment key={comment.id}>
              {updateId === comment.id ? (
                <StyledUpdateInput
                  value={updateText}
                  onChange={updateInputHandler}
                />
              ) : (
                <p
                  style={{
                    width: "75%",
                    overflowX: "scroll",
                    textAlign: "left",
                  }}
                >
                  {comment.text}
                </p>
              )}
              <div
                style={{
                  width: "30%",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ display: "flex" }}>
                  <StyledIconButton
                    onClick={() => {
                      updateButtonHandler(comment.id, comment.text);
                    }}
                  >
                    <AutoFixHighIcon />
                  </StyledIconButton>
                  <StyledIconButton
                    onClick={() => {
                      commentDeleteButtonHandler(comment.id);
                    }}
                  >
                    <DeleteIcon />
                  </StyledIconButton>
                </div>
                <p style={{ fontSize: "5px" }}>{comment.createAt}</p>
              </div>
            </StyledComment>
          );
        })}
      </StyledComments>
      <StyledCommentsForm onSubmit={CommentsFormSubmitHandler}>
        <StyledCommentsFormInput
          value={commentInput}
          onChange={commentChangeHandler}
        />
        <StyledCommentsButton>
          <AddCircleIcon />
        </StyledCommentsButton>
      </StyledCommentsForm>
    </StyledCommentsContainer>
  );
};

const StyledCommentsContainer = styled.div`
  width: 100%;
  height: 30%;
  background: #f9d6d4;
  color: #48404d;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledComments = styled.div`
  width: 100%;
  height: 80%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
  background: #f9d6d4;
  border-radius: 15px;
`;

const StyledComment = styled.div`
  width: 100%;
  height: 30px;
  border: 1px solid #48404d;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
`;

const StyledCommentsForm = styled.form`
  width: 100%;
  height: 20%;
  border: 2px solid #48404d;
  border-radius: 10px;
  padding: 3px;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StyledCommentsFormInput = styled.input`
  width: 80%;
  height: 100%;
  background: transparent;
  margin-left: 20px;
  border: none;
  outline: none;
  padding: 10px;
`;

const StyledCommentsButton = styled.div`
  color: #48404d;
  width: 25px;
  height: 25px;
  display: initial;
  background: none;
  border: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
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
const StyledUpdateInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  border-radius: 5px;

  color: #48404d;
`;
export default Comments;
