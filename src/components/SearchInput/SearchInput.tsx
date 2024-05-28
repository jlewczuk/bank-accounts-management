import { ChangeEvent } from "react";
import styled from "styled-components";

const StyledSearchInput = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: var(--font-size-md);
  border-radius: 10px;
  border: var(--border);
  box-shadow: var(--box-shadow-primary);
  width: 400px;
  outline: none;
  transition:
    box-shadow 0.3s ease-in-out,
    border-color 0.3s ease-in-out;

  &:focus {
    box-shadow: var(--box-shadow-secondary);
    border-color: var(--app-color-primary);
  }
`;

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchInput = ({
  searchTerm,
  setSearchTerm,
}: SearchInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <StyledSearchInput
      data-testid="search-input"
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};
