import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Component", () => {
  it("displays the subtitle", () => {
    render(<App />);
    const subtitle = screen.getByText(/encuentra tu película favorita/i);
    expect(subtitle).toBeInTheDocument();
  });
});
