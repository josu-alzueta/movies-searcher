import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { App } from "./App";
import * as useMoviesModule from "@/ui/hooks/useMovies";
import moviesData from "@/data/movies.json";

// Mock del hook useMovies
vi.mock("@/ui/hooks/useMovies.ts", () => ({
  useMovies: vi.fn(),
}));

describe("App Component", () => {
  const mockUseMovies = vi.spyOn(useMoviesModule, "useMovies");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays the subtitle", () => {
    mockUseMovies.mockReturnValue({
      movies: moviesData,
      onSearch: vi.fn(),
    });

    render(<App />);
    const subtitle = screen.getByText(/encuentra tu película favorita/i);
    expect(subtitle).toBeInTheDocument();
  });

  it("displays movie cards", () => {
    mockUseMovies.mockReturnValue({
      movies: moviesData,
      onSearch: vi.fn(),
    });

    render(<App />);

    const shawshank = screen.getByText("The Shawshank Redemption");
    const matrix = screen.getByText("The Matrix");

    expect(shawshank).toBeInTheDocument();
    expect(matrix).toBeInTheDocument();
  });

  describe("Search functionality", () => {
    it("filters movies when typing in search input", async () => {
      const onSearch = vi.fn();
      mockUseMovies.mockReturnValueOnce({
        movies: moviesData.filter((movie) =>
          movie.title.toLowerCase().includes("matrix")
        ),
        onSearch,
      });

      render(<App />);

      const searchInput = screen.getByPlaceholderText(
        /encuentra tu película favorita/i
      );

      fireEvent.change(searchInput, { target: { value: "matrix" } });

      await vi.waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith("matrix");
        expect(screen.getByText("The Matrix")).toBeInTheDocument();
        expect(
          screen.queryByText("The Shawshank Redemption")
        ).not.toBeInTheDocument();
      });
    });

    it("shows all movies when search input is empty", async () => {
      const onSearch = vi.fn();
      mockUseMovies.mockReturnValueOnce({
        movies: moviesData,
        onSearch,
      });

      render(<App />);

      const searchInput = screen.getByPlaceholderText(
        /encuentra tu película favorita/i
      );

      fireEvent.change(searchInput, { target: { value: "matrix" } });
      fireEvent.change(searchInput, { target: { value: "" } });

      await vi.waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith("");
        expect(screen.getByText("The Matrix")).toBeInTheDocument();
        expect(
          screen.getByText("The Shawshank Redemption")
        ).toBeInTheDocument();
      });
    });

    it("shows no movies when search has no matches", async () => {
      const onSearch = vi.fn();
      mockUseMovies.mockReturnValueOnce({
        movies: [],
        onSearch,
      });

      render(<App />);

      const searchInput = screen.getByPlaceholderText(
        /encuentra tu película favorita/i
      );

      fireEvent.change(searchInput, { target: { value: "xyz123" } });

      await vi.waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith("xyz123");
        expect(
          screen.queryByText("No se encontraron películas")
        ).toBeInTheDocument();
        expect(screen.queryByText("The Matrix")).not.toBeInTheDocument();
        expect(
          screen.queryByText("The Shawshank Redemption")
        ).not.toBeInTheDocument();
      });
    });

    it("is case insensitive when filtering", async () => {
      const onSearch = vi.fn();
      mockUseMovies.mockReturnValueOnce({
        movies: moviesData.filter((movie) =>
          movie.title.toLowerCase().includes("matrix")
        ),
        onSearch,
      });

      render(<App />);

      const searchInput = screen.getByPlaceholderText(
        /encuentra tu película favorita/i
      );

      fireEvent.change(searchInput, { target: { value: "MATRIX" } });

      await vi.waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith("MATRIX");
        expect(screen.getByText("The Matrix")).toBeInTheDocument();
        expect(
          screen.queryByText("The Shawshank Redemption")
        ).not.toBeInTheDocument();
      });
    });
  });
});
