import { render, screen } from "@testing-library/react";
import { Toast } from "./Toast";
import { ToastStatusEnum, ToastTypeEnum } from "../../enums";
import "@testing-library/jest-dom";

describe("Toast", () => {
  it("displays the correct header and text for success toast", () => {
    render(
      <Toast
        header="Successful"
        text="Action is successful."
        type={ToastTypeEnum.SUCCESS}
        toastStatus={ToastStatusEnum.SHOWING}
      />,
    );

    const headerElement = screen.getByRole("heading", { name: /Successful/i });
    const textElement = screen.getByText(/Action is successful./i);

    expect(headerElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it("displays the correct header and text for error toast", () => {
    render(
      <Toast
        header="Error"
        text="An error occurred."
        type={ToastTypeEnum.ERROR}
        toastStatus={ToastStatusEnum.SHOWING}
      />,
    );

    const headerElement = screen.getByRole("heading", { name: /Error/i });
    const textElement = screen.getByText(/An error occurred./i);

    expect(headerElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
