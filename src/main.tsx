import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components";
import { AccountsProvider, SelectionProvider, ToastProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AccountsProvider>
      <ToastProvider>
        <SelectionProvider>
          <App />
        </SelectionProvider>
      </ToastProvider>
    </AccountsProvider>
  </React.StrictMode>,
);
