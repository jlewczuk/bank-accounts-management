import { ComponentType } from "react";
import styled from "styled-components";

const IconWrapper = styled.div`
  cursor: var(--cursor-pointer);
  display: inline-block;
  margin: 0 5px;
`;

interface ActionIconProps {
  icon: ComponentType;
  title?: string;
  onClick?: () => void;
}

export const ActionIcon = ({
  icon: IconComponent,
  title,
  onClick,
}: ActionIconProps) => {
  return (
    <IconWrapper title={title} onClick={onClick}>
      <IconComponent />
    </IconWrapper>
  );
};
