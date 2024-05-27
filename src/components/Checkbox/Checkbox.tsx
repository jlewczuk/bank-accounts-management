import styled from "styled-components";
import { useSelection } from "../../hooks";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + label {
    background-color: #4caf50;
    border-color: #4caf50;
  }

  &:checked + label:after {
    opacity: 1;
  }
`;

const CheckboxLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 3px;
  background-color: #fff;

  &:after {
    position: absolute;
    content: "";
    width: 12px;
    height: 6px;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%) rotate(-45deg) scaleX(-1);
    border: solid white;
    border-width: 0 2px 2px 0;
    opacity: 0;
  }
`;

interface Common {
  id: string;
}

interface WithRowData<T> extends Common {
  rowData: T;
  allData?: undefined;
}

interface WithAllData<T> extends Common {
  allData: T[];
  rowData?: undefined;
}

export type CheckboxProps<T> = WithRowData<T> | WithAllData<T>;

export const Checkbox = <T,>({ id, rowData, allData }: CheckboxProps<T>) => {
  const { selectedItems, toggleSelection, toggleSelectionAll } =
    useSelection<T>();

  const isSelectAll: boolean = typeof allData !== "undefined";
  const isChecked: boolean = isSelectAll
    ? selectedItems.length === allData?.length
    : selectedItems.includes(rowData!);

  const handleChange = (): void => {
    if (isSelectAll) {
      const shouldSelect: boolean = selectedItems.length !== allData!.length;
      toggleSelectionAll(shouldSelect, allData!);
    } else {
      toggleSelection(rowData!);
    }
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox
        id={id}
        checked={isChecked}
        onChange={handleChange}
        aria-label={id}
      />
      <CheckboxLabel htmlFor={id} />
    </CheckboxContainer>
  );
};
