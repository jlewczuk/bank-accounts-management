import { ReactNode, useCallback, useState } from "react";
import { SelectionContext } from "./SelectionContext";

interface SelectionProviderProps<T> {
  children: ReactNode;
  initialSelection?: T[];
}

export const SelectionProvider = <T,>({
  children,
  initialSelection = [],
}: SelectionProviderProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(
    initialSelection || [],
  );

  const toggleSelection = (item: T): void => {
    setSelectedItems((prevSelectedItems: T[]): T[] => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter(
          (selectedItem: T): boolean => selectedItem !== item,
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const resetSelection = useCallback((): void => {
    setSelectedItems([]);
  }, []);

  const toggleSelectionAll = (shouldSelect: boolean, items: T[]): void => {
    if (shouldSelect) {
      setSelectedItems(items);
    } else {
      resetSelection();
    }
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedItems,
        toggleSelection,
        resetSelection,
        toggleSelectionAll,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
