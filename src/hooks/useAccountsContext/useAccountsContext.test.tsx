import { render, renderHook } from "@testing-library/react";
import { act } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAccountsContext } from "./useAccountsContext";
import { AccountsProvider } from "../../contexts";

test("returns a context value when rendered within AccountsProvider", () => {
  const wrapper = ({ children }) => (
    <AccountsProvider>{children}</AccountsProvider>
  );
  const { result } = renderHook(() => useAccountsContext(), { wrapper });

  expect(result.current.accounts).toBe(null);
  expect(typeof result.current.setAccounts).toBe("function");
});

test("throws an error when not wrapped in an AccountsProvider", () => {
  let error: Error | unknown;

  function ErrorFallback({ error }: { error: Error }) {
    return <div role="alert">{error.message}</div>;
  }

  const ErrorThrower = () => {
    useAccountsContext();
    return null;
  };

  act(() => {
    render(
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(err) => {
          error = err;
        }}
      >
        <ErrorThrower />
      </ErrorBoundary>,
    );
  });

  expect(error).toBeDefined();
  if (error instanceof Error) {
    expect(error.message).toEqual(
      "useAccountsContext must be used within an AccountsContext provider",
    );
  }
});
