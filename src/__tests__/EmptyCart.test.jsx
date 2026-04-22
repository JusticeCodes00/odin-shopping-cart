import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, it } from "vitest";
import EmptyCart from "../components/EmptyCart";

const renderComponent = () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <EmptyCart />,
    },
    {
      path: "/shop",
      element: (
        <div>
          <h2>Browse Products</h2>
        </div>
      ),
    },
  ]);

  render(<RouterProvider router={router} />);
  return router;
};

describe("EmptyCart", () => {
  it("should render empty cart message", () => {
    renderComponent();

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Looks like you haven't added anything yet. Go find something you like./i,
      ),
    ).toBeInTheDocument();
  });

  it("should render browse products link", () => {
    renderComponent();

    const link = screen.getByRole("link", { name: /Browse products/i });
    expect(link).toHaveAttribute("href", "/shop");
  });

  it("should navigate to shop page when browse products link is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const link = screen.getByRole("link", { name: /Browse products/i });
    await user.click(link);

    expect(
      await screen.findByRole("heading", { name: /browse products/i }),
    ).toBeInTheDocument();
  });
});
