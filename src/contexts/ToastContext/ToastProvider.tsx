import { createContext, ReactNode, useState } from "react";
import { Toast } from "../../components/Toast";
import { ToastStatusEnum, ToastTypeEnum } from "../../enums";

type ToastProp = {
  header: string;
  text: string;
  type: ToastTypeEnum;
};

interface ToastContextType {
  toast: ToastProp;
  showToast: (props: ToastProp) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastProp>({
    header: "",
    text: "",
    type: ToastTypeEnum.SUCCESS,
  });

  const [toastStatus, setToastStatus] = useState<ToastStatusEnum>(
    ToastStatusEnum.HIDDEN,
  );

  const showToast = ({ header, text, type }: ToastProp): void => {
    setToast({ header, text, type });
    setToastStatus(ToastStatusEnum.SHOWING);

    setTimeout(() => {
      setToastStatus(ToastStatusEnum.HIDING);

      setTimeout(() => {
        setToastStatus(ToastStatusEnum.HIDDEN);
        setToast({ header: "", text: "", type: ToastTypeEnum.SUCCESS });
      }, 1000);
    }, 4000 + 1000);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      {toastStatus !== ToastStatusEnum.HIDDEN && (
        <Toast {...toast} toastStatus={toastStatus} />
      )}
    </ToastContext.Provider>
  );
};
