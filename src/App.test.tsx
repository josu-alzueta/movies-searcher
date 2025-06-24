import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { App } from "./App";

describe("App Component", () => {
  it("displays the subtitle", () => {
    render(<App />);
    const subtitle = screen.getByText(/encuentra tu película favorita/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("displays movie cards", () => {
    render(<App />);

    const shawshank = screen.getByText("The Shawshank Redemption");
    const matrix = screen.getByText("The Matrix");

    expect(shawshank).toBeInTheDocument();
    expect(matrix).toBeInTheDocument();
  });
});
