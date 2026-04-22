import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import CartItem from "../components/CartItem";

const mockItem = {
  title: "Test Product",
  price: 29.99,
  image: "https://example.com/image.jpg",
  category: "Electronics",
  quantity: 2,
};

const renderCartItem = () => {
  render(
    <CartItem
      {...mockItem}
      onIncrease={() => {}}
      onDecrease={() => {}}
      onRemove={() => {}}
    />,
  );
};

describe("CartItem", () => {
  it("should render product title, price, and category", () => {
    renderCartItem();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("$59.98")).toBeInTheDocument();
  });

  it("should render product image with correct alt text", () => {
    render(
      <CartItem
        {...mockItem}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onRemove={() => {}}
      />,
    );

    const image = screen.getByAltText("Test Product");
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("should display correct quantity", () => {
    render(
      <CartItem
        {...mockItem}
        quantity={3}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onRemove={() => {}}
      />,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should calculate total price correctly", () => {
    render(
      <CartItem
        {...mockItem}
        price={25}
        quantity={4}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onRemove={() => {}}
      />,
    );

    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });

  it("should call onIncrease when increase button is clicked", async () => {
    const user = userEvent.setup();
    const onIncrease = vi.fn();

    render(
      <CartItem
        {...mockItem}
        onIncrease={onIncrease}
        onDecrease={() => {}}
        onRemove={() => {}}
      />,
    );

    const increaseButtons = screen.getAllByRole("button");
    await user.click(increaseButtons[1]);

    expect(onIncrease).toHaveBeenCalledOnce();
  });

  it("should call onDecrease when decrease button is clicked", async () => {
    const user = userEvent.setup();
    const onDecrease = vi.fn();

    render(
      <CartItem
        {...mockItem}
        onIncrease={() => {}}
        onDecrease={onDecrease}
        onRemove={() => {}}
      />,
    );

    const decreaseButtons = screen.getAllByRole("button");
    await user.click(decreaseButtons[0]);

    expect(onDecrease).toHaveBeenCalledOnce();
  });

  it("should call onRemove when remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <CartItem
        {...mockItem}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onRemove={onRemove}
      />,
    );

    const removeButtons = screen.getAllByRole("button");
    await user.click(removeButtons[2]);

    expect(onRemove).toHaveBeenCalledOnce();
  });
});
