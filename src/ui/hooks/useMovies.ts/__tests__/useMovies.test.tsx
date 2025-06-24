import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useMovies } from "../useMovies";
import moviesData from "@/data/movies.json";

describe("useMovies hook", () => {
  it("should return all movies from the JSON file", () => {
    const { result } = renderHook(() => useMovies());

    expect(result.current.movies).toEqual(moviesData);
    expect(result.current.movies.length).toBe(moviesData.length);
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
