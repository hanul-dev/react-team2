import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

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
                <input value={updateText} onChange={updateInputHandler} />
              ) : (
                <p>{comment.text}</p>
              )}
              <div
                style={{ width: "35%", display: "flex", alignItems: "center" }}
              >
                <button
                  onClick={() => {
                    updateButtonHandler(comment.id, comment.text);
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    commentDeleteButtonHandler(comment.id);
                  }}
                >
                  삭제
                </button>
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
        <StyledCommentsButton>Submit</StyledCommentsButton>
      </StyledCommentsForm>
    </StyledCommentsContainer>
  );
};

const StyledCommentsContainer = styled.div`
  width: 100%;
  height: 30%;
  border: 2px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledComments = styled.div`
  width: 100%;
  height: 80%;
  padding: 2px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
  border: 1px solid black;
`;

const StyledComment = styled.div`
  width: 100%;
  height: 30px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
`;

const StyledCommentsForm = styled.form`
  width: 100%;
  height: 20%;
  border: 1px solid black;
  padding: 3px;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StyledCommentsFormInput = styled.input`
  width: 80%;
  height: 100%;
  background: palegreen;
  border: none;
  padding: 10px;
`;

const StyledCommentsButton = styled.button`
  width: 20%;
  height: 100%;
  background: skyblue;
  border: none;
`;
export default Comments;
