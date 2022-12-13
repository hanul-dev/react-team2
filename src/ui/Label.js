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
    <StLabel {...styles} onClick={onClick}>
      {children}
    </StLabel>
  );
};
// props 정리, props의 타입모듈.
Label.defaultProps = {
  diplay: "inline-block",
  bgColor: "black",
  color: "white",
  height: "25px",
  radius: "15px",
  opacity: 1,
  onclick: () => {},
  shadow: "none",
};

const StLabel = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border-radius: ${({ radius }) => radius};
  opacity: ${({ opacity }) => opacity};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-shadow: ${({ shadow }) => shadow};
  border: ${({ border }) => border};
  cursor: pointer;
  pointer-events: ${({ event }) => event};
  padding: 3px;
  &:hover {
    outline: none;
    opacity: 0.8;
  }
`;

export default Label;
