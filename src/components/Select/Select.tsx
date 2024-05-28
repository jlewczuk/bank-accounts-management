import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const Label = styled.label`
  color: var(--text-color);
  font-size: var(--font-size-sm);
  margin-bottom: 5px;
`;

const Dropdown = styled.div.attrs(() => ({
  role: "listbox",
}))`
  position: absolute;
  width: 100%;
  border: var(--input-border);
  z-index: 1;
  cursor: var(--cursor-pointer);
  max-height: 160px;
  overflow-y: auto;
  background-color: #fff;
`;

const Option = styled.div.attrs(() => ({
  role: "option",
}))`
  padding: 10px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: #ebebeb;
  }
`;

const SelectTrigger = styled.div.attrs((props) => ({
  "aria-expanded": props["aria-expanded"],
  "aria-haspopup": "listbox",
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #999;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
`;

export type OptionType = {
  value: string | number;
  label: string;
};

type SelectProps = {
  options: OptionType[];
  label?: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

const useInitialSelectedOption = (
  options: OptionType[],
  value: string,
): OptionType | null => {
  return (
    options.find((option: OptionType): boolean => option.value === value) ||
    null
  );
};

export const Select = ({
  options,
  label,
  name,
  value,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    useInitialSelectedOption(options, value),
  );

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (option: OptionType) => {
    setSelectedOption(option);
    setIsOpen(!isOpen);

    if (onChange) {
      onChange({
        target: {
          name: name,
          value: option.value,
        },
      } as ChangeEvent<HTMLSelectElement>);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      {label && <Label htmlFor={`select-${name}`}>{label}</Label>}
      <SelectTrigger onClick={toggling} aria-expanded={isOpen}>
        {selectedOption ? selectedOption.label : "Select an option"}
      </SelectTrigger>
      {/*Added this select element below due to testing reasons and made its style display:none to hide*/}
      <select
        id={`select-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        style={{ display: "none" }}
      />
      {isOpen && (
        <Dropdown>
          {options.map((option: OptionType) => (
            <Option key={option.value} onClick={() => onOptionClicked(option)}>
              {option.label}
            </Option>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};
