import { ComponentType, useState } from "react";
import { Popup } from "../../components";
import { ToastTypeEnum } from "../../enums";

interface PopupContentProps {
  onClose: () => void;
  showToast?: (message: string, type: ToastTypeEnum) => void;
  editFormConfig?: any;
}

export const withPopup = <P extends object>(
  Component: ComponentType<P>,
  PopupContent: ComponentType<PopupContentProps>,
) => {
  return ({ editFormConfig, ...props }: P & { editFormConfig?: any }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const togglePopup = (): void => {
      setPopupOpen((prevIsPopupOpen) => !prevIsPopupOpen);
    };

    return (
      <>
        <Component {...(props as P)} onClick={togglePopup} />
        {isPopupOpen && (
          <Popup onClose={togglePopup}>
            <PopupContent
              editFormConfig={editFormConfig}
              onClose={togglePopup}
            />
          </Popup>
        )}
      </>
    );
  };
};
