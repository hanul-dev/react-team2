import React from "react";
import styled from "styled-components";

const Input = ({
  width,
  children,
  bgColor,
  color,
  border,
  radius,
  opacity,
  shadow,
  ta,
  type,
  name,
  value,
  change,
  margin,
  holder,
}) => {
  const styles = {
    width,
    bgColor,
    color,
    border,
    radius,
    shadow,
    opacity,
    ta,
    name,
    type,
    value,
    margin,
  };
  return (
    <StInput {...styles} placeholder={holder} onChange={change}>
      {children}
    </StInput>
  );
};

Input.defaultProps = {
  width: "200px",
  bgColor: "none",
  color: "black",
  border: "none",
  radius: "0px",
  shadow: "0px 0px 6px #333",
  opacity: 1,
  ta: "center",
  type: "text",
  name: "",
  value: "",
  change: e => {},
  margin: "0",
  holder: "",
};

const StInput = styled.input`
  width: ${({ width }) => width};
  type: ${({ type }) => type};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: ${({ border }) => border};
  opacity: ${({ opacity }) => opacity};
  border-radius: ${({ radius }) => radius};
  box-shadow: ${({ shadow }) => shadow};
  text-align: ${({ ta }) => ta};
  name: ${({ name }) => name};
  value: ${({ value }) => value};
  margin: ${({ margin }) => margin};
  &:focus {
    outline: none;
    box-shadow: 0px 0px 6px rgba(100, 58, 199);
  }
`;

export default Input;
