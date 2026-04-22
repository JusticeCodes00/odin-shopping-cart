import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router";
import Product from "../components/Product";

// Helper function to render with router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Product", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 19.99,
    description: "This is a test product description",
    category: "Electronics",
    image: "https://example.com/image.jpg",
    rating: {
      rate: 4.5,
      count: 100,
    },
  };

  it("should render product with correct title and price", () => {
    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Price: $19.99")).toBeInTheDocument();
  });

  it("should render product image with correct alt text", () => {
    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    const image = screen.getByAltText("Test Product");
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("should render product category", () => {
    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  it("should render product description", () => {
    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    expect(
      screen.getByText("This is a test product description"),
    ).toBeInTheDocument();
  });

  it("should render rating with correct count", () => {
    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByText("(4.5)")).toBeInTheDocument();
  });

  it("should render quantity input with default value of 1", () => {
    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(1);
  });

  it("should increase quantity when plus button is clicked", async () => {
    const user = userEvent.setup();

    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    const input = screen.getByRole("spinbutton");
    const quantityRow = input.closest("div");
    const plusButton = quantityRow.querySelector("button:last-child");

    await user.click(plusButton);

    expect(input).toHaveValue(2);
  });

  it("should decrease quantity when minus button is clicked", async () => {
    const user = userEvent.setup();

    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    const input = screen.getByRole("spinbutton");
    const quantityRow = input.closest("div");

    // First increase to 2
    const plusButton = quantityRow.querySelector("button:last-child");
    await user.click(plusButton);

    // Then decrease back to 1
    const minusButton = quantityRow.querySelector("button:first-child");
    await user.click(minusButton);

    expect(input).toHaveValue(1);
  });

  it("should not go below quantity of 1", async () => {
    const user = userEvent.setup();

    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    const input = screen.getByRole("spinbutton");
    const quantityRow = input.closest("div");
    const minusButton = quantityRow.querySelector("button:first-child");

    await user.click(minusButton);

    expect(input).toHaveValue(1);
  });

  it("should call onAddToCart with correct quantity when Add to Cart is clicked", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    renderWithRouter(<Product {...mockProduct} onAddToCart={onAddToCart} />);

    const addButton = screen.getByRole("button", { name: /Add to Cart/i });
    await user.click(addButton);

    expect(onAddToCart).toHaveBeenCalledWith(1);
  });

  it("should call onAddToCart with updated quantity after incrementing", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    renderWithRouter(<Product {...mockProduct} onAddToCart={onAddToCart} />);

    const input = screen.getByRole("spinbutton");
    const quantityRow = input.closest("div");

    // Click plus button to increase quantity
    const plusButton = quantityRow.querySelector("button:last-child");
    await user.click(plusButton);

    const addButton = screen.getByRole("button", { name: /Add to Cart/i });
    await user.click(addButton);

    expect(onAddToCart).toHaveBeenCalledWith(2);
  });

  it("should render as an article element", () => {
    renderWithRouter(<Product {...mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
  });
});
