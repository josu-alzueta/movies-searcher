import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useMovies } from "../useMovies";
import moviesData from "@/data/movies.json";

describe("useMovies hook", () => {
  it("should return all movies initially", () => {
    const { result } = renderHook(() => useMovies());

    expect(result.current.movies).toEqual(moviesData);
    expect(result.current.movies.length).toBe(moviesData.length);
  });

  describe("onSearch", () => {
    it("should filter movies when searching by title", () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.onSearch("matrix");
      });

      expect(result.current.movies.length).toBe(1);
      expect(result.current.movies[0].title).toBe("The Matrix");
    });

    it("should be case insensitive when searching", () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.onSearch("MATRIX");
      });

      expect(result.current.movies.length).toBe(1);
      expect(result.current.movies[0].title).toBe("The Matrix");
    });

    it("should return empty array when no movies match the search", () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.onSearch("xyz123");
      });

      expect(result.current.movies).toEqual([]);
      expect(result.current.movies.length).toBe(0);
    });

    it("should return all movies when search term is empty", () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.onSearch("");
      });

      expect(result.current.movies).toEqual(moviesData);
      expect(result.current.movies.length).toBe(moviesData.length);
    });

    it("should find partial matches in movie titles", () => {
      const { result } = renderHook(() => useMovies());

      act(() => {
        result.current.onSearch("godfather");
      });

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
