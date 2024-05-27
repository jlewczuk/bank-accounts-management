import { createContext } from "react";

export type SelectionContextType<T> = {
  selectedItems: T[];
  toggleSelection: (item: T) => void;
  resetSelection: () => void;
  toggleSelectionAll: (shouldSelect: boolean, items: T[]) => void;
};

export const SelectionContext = createContext<SelectionContextType<any> | null>(
  null,
);
