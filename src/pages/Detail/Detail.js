import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PaintDetailContainer from "./PaintDetail/container/PaintDetailContainer";
import CommentsContainer from "./Comments/container/CommentsContainer";

const Detail = () => {
  let { id } = useParams();

  return (
    <StyledDetailContainer>
      <StyledDetailWrapper>
        <PaintDetailContainer postId={id} />
        <CommentsContainer postId={id} />
      </StyledDetailWrapper>
    </StyledDetailContainer>
  );
};

const StyledDetailContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDetailWrapper = styled.div`
  width: 60%;
  height: calc(60 * 1.6%);
  border: 2px solid red;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
export default Detail;
