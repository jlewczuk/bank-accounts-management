import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useToast } from "./useToast";
import { ToastProvider } from "../../contexts";
import { ToastTypeEnum } from "../../enums";

describe("useToast", () => {
  it("should throw error when used outside of the ToastProvider", () => {
    let error: unknown;
    try {
      renderHook(() => useToast());
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      new Error("useToast must be used within a ToastProvider"),
    );
  });

  it("should not throw error when used within the ToastProvider", () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.showToast({
        header: "header",
        text: "text",
        type: ToastTypeEnum.SUCCESS,
      });
    });

    expect(result.current.toast).toEqual({
      header: "header",
      text: "text",
      type: ToastTypeEnum.SUCCESS,
    });
  });
});
