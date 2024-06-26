import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { RoutesEnum } from "../../enums";
import { AccountsManagementPanel, Footer, HomePage, TopBar } from "../index";
import "../../variables.css";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: var(--font-family), sans-serif;
        color: var(--text-color);
    }

    body {
        background-color: var(--background-color);
    }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
`;

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Router>
          <Routes>
            <Route path={RoutesEnum.Home} element={<HomePage />}></Route>
            <Route
              path={RoutesEnum.ManagementPanel}
              element={
                <>
                  <TopBar />
                  <AccountsManagementPanel />
                </>
              }
            ></Route>
          </Routes>
        </Router>
      </Container>
      <Footer />
    </>
  );
};
