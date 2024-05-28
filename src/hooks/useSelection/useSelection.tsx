import { useContext } from "react";
import { SelectionContext, SelectionContextType } from "../../contexts";

export function useSelection<T>(): SelectionContextType<T> {
  const context: SelectionContextType<T> | null = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context as SelectionContextType<T>;
}
