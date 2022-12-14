import React from "react";
import styled from "styled-components";

const Button = ({
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
  };
  return (
    <StBtn {...styles} onClick={onClick}>
      {children}
    </StBtn>
  );
};
// props 정리, props의 타입모듈.
Button.defaultProps = {
  bgColor: "transparent",
  color: "#d6a680",
  radius: "8px",
  opacity: 1,
  onclick: () => {},
  shadow: "none",
  border: "1px solid #d6a680",
  width: "80px",
};

const StBtn = styled.button`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border-radius: ${({ radius }) => radius};
  opacity: ${({ opacity }) => opacity};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-shadow: ${({ shadow }) => shadow};
  border: ${({ border }) => border};
  cursor: pointer;
  padding: 7px 10px;
  &:hover {
    outline: none;
    opacity: 0.8;
  }
`;

export default Button;
