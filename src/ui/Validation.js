import React from "react";
import styled from "styled-components";

const Validation = ({
  children,
  color,
}) => {
  const styles = {
    color,
  };
  return <StValidation {...styles}>{children}</StValidation>;
};

Validation.defaultProps = {
  color: "#F44336",
};
const StValidation = styled.div`
  color: ${({ color }) => color};
  font-size: 12px;
`;

export default Validation;
