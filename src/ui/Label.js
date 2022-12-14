import React from "react";
import styled from "styled-components";

const Label = ({
  onClick,
  bgColor,
  color,
  radius,
  opacity,
  children,
  width,
  id,
  height,
  hover,
  shadow,
  border,
  event,
}) => {
  const styles = {
    hover,
    bgColor,
    color,
    shadow,
    radius,
    opacity,
    width,
    height,
    children,
    border,
    event,
  };
  return (
    <StLabel {...styles} onClick={onClick} id={id}>
      {children}
    </StLabel>
  );
};
// props 정리, props의 타입모듈.
Label.defaultProps = {
  onclick: () => {},
};

const StLabel = styled.div`
  display: inline-block;
  background-color: #e6b5b8;
  color: white;
  opacity: 1;
  width: 80px;
  height: 25px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  pointer-events: ${({ event }) => event};
  padding: 3px;
  &:hover {
    outline: none;
    opacity: 0.8;
  }
`;

export default Label;
