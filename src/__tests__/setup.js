// tests/setup.js
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers); // adds custom matchers: toBeInTheDocument, etc.

afterEach(() => {
  cleanup();
});
