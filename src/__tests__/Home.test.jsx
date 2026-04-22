import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Home from "../pages/Home";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";

const renderWihRouter = (initialEntries = ["/"]) => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, { initialEntries });

  render(<RouterProvider router={router} />);
  return user;
};

describe("Home", () => {
  it("should render title", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText("Your Favorite Store, Online")).toBeInTheDocument();
  });

  it("should displays paragraph text", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(
        /Discover a wide range of products, from the latest gadgets to everyday essentials./i,
      ),
    ).toBeInTheDocument();
  });

  it("should navigate to shop page when shop now button is clicked", async () => {
    const user = renderWihRouter();
    const button = screen.getByRole("link", { name: /Shop now/i });
    await user.click(button);

    expect(
      await screen.findByRole("heading", { name: /browse products/i }),
    ).toBeInTheDocument();
  });
});
