import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import routes from "../routes";
import productsData from "../testData/products";

const renderWithRouter = (initialEntries = ["/shop"]) => {
  const user = userEvent.setup();

  const router = createMemoryRouter(routes, { initialEntries });

  render(<RouterProvider router={router} />);

  return user;
};

describe("Shop", () => {
  beforeEach(() => {
    window.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(productsData),
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render correct number of products after successful fetch", async () => {
    renderWithRouter();

    const productArticles = await screen.findAllByRole("article");

    expect(productArticles).toHaveLength(productsData.length);
  });

  it("should render product skeletons when still fetching", async () => {
    window.fetch.mockImplementationOnce(() => new Promise(() => {}));

    renderWithRouter();

    expect(
      screen.getByRole("status", { name: /loading products/i }),
    ).toBeInTheDocument();
  });

  it("should unmount product skeletons when no longer in loading state", async () => {
    renderWithRouter();

    const loadingSkeleton = screen.getByRole("status", /loading products/i);

    expect(loadingSkeleton).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByRole("status", /loading products/i),
    );
  });

  it("should render error message when fetch fails", async () => {
    window.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error")),
    );

    renderWithRouter();

    const errorMessage = await screen.findByRole("heading", {
      name: /could not load products/i,
    });

    expect(errorMessage).toBeInTheDocument();
  });
});
