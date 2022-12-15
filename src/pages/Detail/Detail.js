import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PaintDetailContainer from "./PaintDetail/container/PaintDetailContainer";
import CommentsContainer from "./Comments/container/CommentsContainer";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const Detail = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  return (
    <StyledDetailContainer>
      <StyledDetailWrapper>
        <IconBox>
          <TipsAndUpdatesIcon
            onClick={() => {
              navigate("/");
            }}
          />
        </IconBox>
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
  background: #a7767c;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  position: relative;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  &::before {
    content: "";
    background-color: #fff;
    border-radius: 50%;
    width: 75px;
    height: 75px;
    text-align: center;
    position: absolute;
    top: -30px;
    left: -30px;
  }
`;

const IconBox = styled.div`
  display: initial;
  position: absolute;
  top: 0;
  left: 0;
  color: #48404d;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`;
export default Detail;
