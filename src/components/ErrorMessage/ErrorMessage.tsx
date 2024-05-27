import styled from "styled-components";

const StyledErrorMessage = styled.p`
  color: red;
`;

interface ErrorMessageProps {
  text: string;
}

export const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return <StyledErrorMessage>{text}</StyledErrorMessage>;
};
