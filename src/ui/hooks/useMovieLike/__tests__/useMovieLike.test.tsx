import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMovieLike } from "../useMovieLike";

describe("useMovieLike", () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should make a POST request to like endpoint", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const { result } = renderHook(() => useMovieLike());
    await result.current.likeMovie();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://movies-backend-biko2.vercel.app/api/like?token=5048",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should handle API response", async () => {
    const mockResponse = { success: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { result } = renderHook(() => useMovieLike());
    await result.current.likeMovie();

    expect(mockFetch).toHaveBeenCalled();
  });
});
