import styled from "styled-components";
import { getCurrentYear } from "../../helpers";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #282c34;
  color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      © {getCurrentYear()} TranSecure. All rights reserved.
    </FooterContainer>
  );
};
