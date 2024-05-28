import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { ButtonVariantEnum } from "../../enums";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  $variant?: ButtonVariantEnum;
}

const handleVariant = (variant?: ButtonVariantEnum, disabled?: boolean) => {
  if (disabled) return "var(--background-color-disabled)";
  if (variant === ButtonVariantEnum.Warning) return "var(--color-warning)";
  return "var(--app-color-primary)";
};

const handleHoverVariant = (
  variant?: ButtonVariantEnum,
  disabled?: boolean,
) => {
  if (disabled) return "var(--background-color-disabled)";
  if (variant === ButtonVariantEnum.Warning)
    return "var(--color-warning-hover)";
  return "var(--app-color-primary-hover)";
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  padding: 15px 32px;
  text-decoration: none;
  display: inline-block;
  font-size: var(--font-size-md);
  margin: 10px;
  border-radius: 8px;
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  transition: all 0.2s ease-in-out;
  cursor: ${(props) =>
    props.disabled ? "var(--cursor-not-allowed)" : "var(--cursor-pointer)"};

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
