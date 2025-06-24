import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMovies } from "../useMovies";
import { moviesService } from "@/core/application/movies/moviesService";
import moviesData from "@/data/movies.json";

vi.mock("@/core/application/movies/moviesService", () => ({
  moviesService: {
    getMovies: vi.fn(),
    searchMovies: vi.fn(),
  },
}));

describe("useMovies hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (moviesService.getMovies as any).mockResolvedValue(moviesData);
    (moviesService.searchMovies as any).mockImplementation((query: string) => {
      const searchTerm = query.toLowerCase();
      return Promise.resolve(
        moviesData.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm)
        )
      );
    });
  });

  it("should return all movies initially", async () => {
    const { result } = renderHook(() => useMovies());

    await vi.waitFor(() => {
      expect(result.current.movies).toEqual(moviesData);
      expect(result.current.movies.length).toBe(moviesData.length);
    });

    expect(moviesService.getMovies).toHaveBeenCalledTimes(1);
  });

  describe("onSearch", () => {
    it("should filter movies when searching by title", async () => {
      const { result } = renderHook(() => useMovies());

      await act(async () => {
        await result.current.onSearch("matrix");
      });

      expect(moviesService.searchMovies).toHaveBeenCalledWith("matrix");
      expect(result.current.movies.length).toBe(1);
      expect(result.current.movies[0].title).toBe("The Matrix");
    });

    it("should be case insensitive when searching", async () => {
      const { result } = renderHook(() => useMovies());

      await act(async () => {
        await result.current.onSearch("MATRIX");
      });

      expect(moviesService.searchMovies).toHaveBeenCalledWith("MATRIX");
      expect(result.current.movies.length).toBe(1);
      expect(result.current.movies[0].title).toBe("The Matrix");
    });

    it("should return empty array when no movies match the search", async () => {
      const { result } = renderHook(() => useMovies());

      await act(async () => {
        await result.current.onSearch("xyz123");
      });

      expect(moviesService.searchMovies).toHaveBeenCalledWith("xyz123");
      expect(result.current.movies).toEqual([]);
      expect(result.current.movies.length).toBe(0);
    });

    it("should return all movies when search term is empty", async () => {
      const { result } = renderHook(() => useMovies());

      await act(async () => {
        await result.current.onSearch("");
      });

      expect(moviesService.searchMovies).toHaveBeenCalledWith("");
      expect(result.current.movies).toEqual(moviesData);
      expect(result.current.movies.length).toBe(moviesData.length);
    });

    it("should find partial matches in movie titles", async () => {
      const { result } = renderHook(() => useMovies());

      await act(async () => {
        await result.current.onSearch("godfather");
      });

      expect(moviesService.searchMovies).toHaveBeenCalledWith("godfather");
      expect(result.current.movies.length).toBe(1);
      expect(result.current.movies[0].title).toBe("The Godfather");
    });

    it("should return movies with the correct structure", () => {
      const { result } = renderHook(() => useMovies());

      const firstMovie = result.current.movies[0];

      expect(firstMovie).toHaveProperty("id");
      expect(firstMovie).toHaveProperty("title");
      expect(firstMovie).toHaveProperty("director");
      expect(firstMovie).toHaveProperty("year");
      expect(firstMovie).toHaveProperty("genre");
      expect(firstMovie).toHaveProperty("description");
    });
  });
});
