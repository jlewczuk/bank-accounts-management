import styled from "styled-components";
import { rotate } from "../../helpers";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  max-width: 11vw;
  margin-bottom: 40px;
  animation: ${rotate} 60s linear infinite;
`;

const HeaderImage = styled.img`
  max-width: 35vw;
  padding-bottom: 40px;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Logo src="/src/assets/header-logo.png" alt="TranSecure logo"></Logo>
      <HeaderImage
        src="/src/assets/header-img.png"
        alt="TranSecure header"
      ></HeaderImage>
    </StyledHeader>
  );
};
