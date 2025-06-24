import { render, screen, fireEvent } from "@testing-library/react";
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

  describe("Search functionality", () => {
    it("filters movies when typing in search input", () => {
      render(<App />);

      const searchInput = screen.getByPlaceholderText(
        /encuentra tu película favorita/i
      );

      fireEvent.change(searchInput, { target: { value: "matrix" } });

      expect(screen.getByText("The Matrix")).toBeInTheDocument();
      expect(
        screen.queryByText("The Shawshank Redemption")
      ).not.toBeInTheDocument();
    });

    it("shows all movies when search input is empty", () => {
      render(<App />);

      const searchInput = screen.getByPlaceholderText(
        /encuentra tu película favorita/i
      );

      fireEvent.change(searchInput, { target: { value: "matrix" } });
      fireEvent.change(searchInput, { target: { value: "" } });

      expect(screen.getByText("The Matrix")).toBeInTheDocument();
      expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
    });

    it("shows no movies when search has no matches", () => {
      render(<App />);

      const searchInput = screen.getByPlaceholderText(
        /encuentra tu película favorita/i
      );

      fireEvent.change(searchInput, { target: { value: "xyz123" } });

      expect(screen.queryByText("The Matrix")).not.toBeInTheDocument();
      expect(
        screen.queryByText("The Shawshank Redemption")
      ).not.toBeInTheDocument();
    });

    it("is case insensitive when filtering", () => {
      render(<App />);

      const searchInput = screen.getByPlaceholderText(
        /encuentra tu película favorita/i
      );

      fireEvent.change(searchInput, { target: { value: "MATRIX" } });

      expect(screen.getByText("The Matrix")).toBeInTheDocument();
      expect(
        screen.queryByText("The Shawshank Redemption")
      ).not.toBeInTheDocument();
    });
  });
});
