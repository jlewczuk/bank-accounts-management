import { createContext } from "react";
import { ToastTypeEnum } from "../../enums";

export interface IToastContext {
  toast: { text: string; type: string };
  showToast: (text: string, type: ToastTypeEnum) => void;
}

export const ToastContext = createContext<IToastContext>({} as IToastContext);
