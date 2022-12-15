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
  id,
  margin,
  keyup,
  keypress,
  holder,
  height,
  padding,
  outline,
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
    height,
    margin,
    padding,
    outline,
  };
  return (
    <StInput
      {...styles}
      placeholder={holder}
      onChange={change}
      onKeyUp={keyup}
      onKeyPress={keypress}
      id={id}
    >
      {children}
    </StInput>
  );
};

Input.defaultProps = {
  width: "200px",
  height: "2em",
  bgColor: "none",
  color: "black",
  border: "1px solid #333",
  radius: "8px",
  opacity: 1,
  ta: "left",
  type: "text",
  name: "",
  value: "",
  change: (e) => {},
  keyup: (e) => {},
  keypress: (e) => {},
  margin: "0",
  padding: "10px",
  holder: "",
  outline: "",
};

const StInput = styled.input`
  width: ${({ width }) => width};
  type: ${({ type }) => type};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: ${({ border }) => border};
  opacity: ${({ opacity }) => opacity};
  border-radius: ${({ radius }) => radius};
  height: ${({ height }) => height};
  box-shadow: ${({ shadow }) => shadow};
  text-align: ${({ ta }) => ta};
  name: ${({ name }) => name};
  value: ${({ value }) => value};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};

  &:focus {
    outline: none;
  }
`;

export default Input;
