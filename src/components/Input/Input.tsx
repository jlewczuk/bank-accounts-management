import React from "react";
import styled from "styled-components";
import { INPUT_MASKS } from "../../constants";
import { MaskEnum } from "../../enums";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #333;
  font-size: 14px;
`;

const InputField = styled.input`
  height: 40px;
  border: 1px solid #999;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #333;
  }
`;

type InputProps = {
  label?: string;
  type: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mask?: MaskEnum;
  required?: boolean;
};

export const Input = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  mask,
  required,
}: InputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;

    if (
      newValue === "" ||
      (mask && INPUT_MASKS[mask] && INPUT_MASKS[mask](newValue))
    ) {
      onChange(e);
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value;

    if (newValue === "") {
      return;
    }

    if (newValue[newValue.length - 1] === ".") {
      newValue += "00";
    } else if (!newValue.includes(".")) {
      newValue += ".00";
    } else if (newValue.split(".")[1].length === 1) {
      newValue += "0";
    }

    if (newValue !== event.target.value) {
      event.target.value = newValue;
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleBlur = mask === MaskEnum.Decimal ? handleInputBlur : undefined;
  const inputId = `${name}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <InputWrapper>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <InputField
        id={inputId}
        type={type || "text"}
        name={name}
        value={value || ""}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
      />
    </InputWrapper>
  );
};
