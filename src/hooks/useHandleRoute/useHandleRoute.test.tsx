import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleRoute } from "./useHandleRoute";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("useHandleRoute", () => {
  it("calls useNavigate with the correct arguments", () => {
    const route = "/test-route";
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const { result } = renderHook(() => useHandleRoute());

    act(() => {
      result.current(route);
    });

    expect(navigate).toHaveBeenCalledWith(route);
  });
});
