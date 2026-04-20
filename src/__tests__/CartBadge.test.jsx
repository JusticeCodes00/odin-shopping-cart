import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CartBadge from "../components/CartBadge";

describe("CartBadge", () => {
  it("should render with correct prop count value", () => {
    render(<CartBadge count={4} />);
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
