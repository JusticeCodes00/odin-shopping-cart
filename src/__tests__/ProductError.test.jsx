import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ProductError from "../components/ProductError";

describe("ProductError", () => {
  it("should render error heading", () => {
    render(<ProductError onRetry={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /could not load products/i }),
    ).toBeInTheDocument();
  });

  it("should render error message", () => {
    render(<ProductError onRetry={() => {}} />);

    expect(
      screen.getByText(
        /Something went wrong while fetching the products. Check your connection and try again./i,
      ),
    ).toBeInTheDocument();
  });

  it("should render retry button when onRetry is provided", () => {
    render(<ProductError onRetry={() => {}} />);

    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it("should not render retry button when onRetry is not provided", () => {
    render(<ProductError />);

    expect(
      screen.queryByRole("button", { name: /try again/i }),
    ).not.toBeInTheDocument();
  });

  it("should call onRetry when retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<ProductError onRetry={onRetry} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });
    await user.click(retryButton);

    expect(onRetry).toHaveBeenCalledOnce();
  });
});
