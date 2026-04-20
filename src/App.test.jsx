import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "./routes";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import products from "./testData/products";

const renderWithRouter = (initialEntries = ["/"]) => {
  const user = userEvent.setup();

  const router = createMemoryRouter(routes, { initialEntries });

  render(<RouterProvider router={router} />);
  return user;
};

describe("App", () => {
  it("should render app name", () => {
    renderWithRouter();
    expect(screen.getByRole("heading", { name: /OdinStore/i }));
  });

  it("should render cartLink in header", () => {
    renderWithRouter();
    const header = screen.getByRole("banner");

    expect(
      within(header).getByRole("link", { name: /cart/i }),
    ).toBeInTheDocument();
  });

  it("should render with links to view home, shop, and cart page", () => {
    renderWithRouter();

    const footer = screen.getByRole("contentinfo");
    const homeLink = within(footer).getByRole("link", { name: /\//i });
    const shopLink = within(footer).getByRole("link", { name: /shop/i });
    const cartLink = within(footer).getByRole("link", { name: /cart/i });

    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });


});
