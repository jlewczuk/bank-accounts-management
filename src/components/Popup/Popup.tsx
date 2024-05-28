import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Button } from "../Button";
import { Divider } from "../Divider";
import { ButtonContainer } from "../styledComponents";

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: var(--popup-background-color);
  z-index: var(--top-z-index);
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

interface PopupProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Popup = ({ children, onClose }: PopupProps) => {
  const el = document.getElementById("root") || document.createElement("div");
  if (!document.getElementById("root")) {
    el.id = "root";
    document.body.appendChild(el);
  }
  return ReactDOM.createPortal(
    <PopupBackground onClick={onClose} data-testid="popup-background">
      <PopupContent
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
        data-testid="popup-content"
      >
        {children}
        <Divider />
        <ButtonContainer>
          <Button text="Close" onClick={onClose} />
        </ButtonContainer>
      </PopupContent>
    </PopupBackground>,
    el,
  );
};
