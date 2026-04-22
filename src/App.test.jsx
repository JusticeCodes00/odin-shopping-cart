import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "./routes";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";

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

  it("should render home view when home link is clicked", async () => {
    const user = renderWithRouter(["/shop"]);

    const footer = screen.getByRole("contentinfo");
    const homeLink = within(footer).getByRole("link", { name: /\//i });

    await user.click(homeLink);

    const homeHeading = await screen.findByRole("heading", {
      name: /your favorite store, online/i,
    });

    expect(homeHeading).toBeInTheDocument();
  });

  it("should render shopping view when shop link is clicked", async () => {
    const user = renderWithRouter(["/shop"]);

    const footer = screen.getByRole("contentinfo");
    const shopLink = within(footer).getByRole("link", { name: /shop/i });

    await user.click(shopLink);

    const shopHeading = await screen.findByRole("heading", {
      name: /browse products/i,
    });

    expect(shopHeading).toBeInTheDocument();
  });

  it("should render cart view when cart link is clicked", async () => {
    const user = renderWithRouter(["/shop"]);

    const footer = screen.getByRole("contentinfo");
    const cartLink = within(footer).getByRole("link", { name: /cart/i });

    await user.click(cartLink);

    const cartHeading = await screen.findByRole("heading", {
      name: /your cart/i,
    });

    expect(cartHeading).toBeInTheDocument();
  });
});
