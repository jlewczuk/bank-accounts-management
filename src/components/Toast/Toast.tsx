import styled, { css } from "styled-components";
import {
  AnimationDirectionEnum,
  ToastStatusEnum,
  ToastTypeEnum,
} from "../../enums";
import { slideIn, slideOut } from "../../helpers";

const ToastStyles = styled.div<ToastStylesProps>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: auto;
  max-width: 300px;
  padding: 20px;
  background-color: var(--color-white);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-left: 5px solid
    ${(props) =>
      props.type === ToastTypeEnum.ERROR
        ? "var(--color-warning)"
        : "var(--color-success)"};
  z-index: var(--top-z-index);
  transition: all 0.5s ease;
  color: var(--text-color);

  h5 {
    margin: 0 0 10px 0;
    color: ${(props) =>
      props.type === ToastTypeEnum.ERROR
        ? "var(--color-warning)"
        : "var(--color-success)"};
  }

  p {
    margin: 0;
  }

  animation: ${(props) =>
    props.$animate === "in"
      ? css`
          ${slideIn} 0.5s forwards
        `
      : css`
          ${slideOut} 0.5s forwards
        `};
`;

type ToastStylesProps = Pick<ToastProps, "type"> & {
  $animate: AnimationDirectionEnum;
};

type ToastProps = {
  text: string;
  header: string;
  type: ToastTypeEnum;
  toastStatus: ToastStatusEnum;
};

export const Toast = ({ header, text, type, toastStatus }: ToastProps) => {
  const animate =
    toastStatus === ToastStatusEnum.SHOWING
      ? AnimationDirectionEnum.IN
      : AnimationDirectionEnum.OUT;
  const lines = text.split("\n");

  return (
    <ToastStyles type={type} $animate={animate}>
      <h5>{header}</h5>

      {lines.map((line, index) => (
        <span key={`line-${index}`}>
          {line} <br />
        </span>
      ))}
    </ToastStyles>
  );
};
