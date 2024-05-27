import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { ButtonVariantEnum } from "../../enums";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  $variant?: ButtonVariantEnum;
}

const handleVariant = (variant?: ButtonVariantEnum, disabled?: boolean) => {
  if (disabled) return "#bdc3c7";
  if (variant === ButtonVariantEnum.Warning) return "#FF5722";
  return "#3498db";
};

const handleHoverVariant = (
  variant?: ButtonVariantEnum,
  disabled?: boolean,
) => {
  if (disabled) return "#bdc3c7";
  if (variant === ButtonVariantEnum.Warning) return "#DF3A01";
  return "#2980b9";
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  padding: 15px 32px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  transition: all 0.2s ease-in-out;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  background-color: ${(props) => handleVariant(props.$variant, props.disabled)};

  &:hover {
    background-color: ${(props) =>
      handleHoverVariant(props.$variant, props.disabled)};
  }

  &:active {
    background-color: ${(props) =>
      handleHoverVariant(props.$variant, props.disabled)};
    outline: 0;
  }
`;

export const Button = ({
  text,
  $variant = ButtonVariantEnum.Default,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $variant={$variant} {...props}>
      {text}
    </StyledButton>
  );
};
