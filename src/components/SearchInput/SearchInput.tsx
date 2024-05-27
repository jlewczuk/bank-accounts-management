import { ChangeEvent } from "react";
import styled from "styled-components";

const StyledSearchInput = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: calc(100% - 40px);
  max-width: 400px;
  outline: none;
  transition:
    box-shadow 0.3s ease-in-out,
    border-color 0.3s ease-in-out;

  &:focus {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    border-color: #3498db;
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
