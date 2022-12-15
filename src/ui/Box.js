import { autoBatchEnhancer } from "@reduxjs/toolkit";
import React from "react";
import styled from "styled-components";

const Box = ({
  width,
  children,
  align,
  justify,
  direction,
  display,
  bgColor,
  padding,
  color,
  border,
  radius,
  opacity,
  margin,
  shadow,
  height,
  position,
  flexWrap,
  overflow,
  gap,
}) => {
  const styles = {
    width,
    align,
    justify,
    direction,
    display,
    bgColor,
    color,
    border,
    radius,
    shadow,
    opacity,
    margin,
    padding,
    height,
    position,
    flexWrap,
    overflow,
    gap,
  };
  return <StCard {...styles}>{children}</StCard>;
};

Box.defaultProps = {
  width: "100%",
  overflow: "auto",
  height: "100%",
  display: "flex",
  align: "center",
  justify: "center",
  direction: "row",
  bgColor: "transparent",
  color: "#333333",
  border: "none",
  radius: "0px",
  shadow: "none",
  opacity: 1,
  margin: "0 auto",
  position: "",
  flexWrap: "",
  gap: "",
};
const StCard = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: ${({ display }) => display};
  align-items: ${({ align }) => align};
  gap: ${({ gap }) => gap};
  justify-content: ${({ justify }) => justify};
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border: ${({ border }) => border};
  padding: ${({ padding }) => padding};
  opacity: ${({ opacity }) => opacity};
  border-radius: ${({ radius }) => radius};
  box-shadow: ${({ shadow }) => shadow};
  margin: ${({ margin }) => margin};
  position: ${({ position }) => position};
  overflow: ${({ overflow }) => overflow};
`;

export default Box;
