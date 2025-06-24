import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchInput } from "../SearchInput";

describe("SearchInput Component", () => {
  it("renders with default placeholder", () => {
    render(<SearchInput onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText("Encuentra tu película favorita");
    expect(input).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    const customPlaceholder = "Buscar película...";
    render(<SearchInput onSearch={vi.fn()} placeholder={customPlaceholder} />);

    const input = screen.getByPlaceholderText(customPlaceholder);
    expect(input).toBeInTheDocument();
  });

  it("calls onSearch with input value when typing", () => {
    const onSearch = vi.fn();
    render(<SearchInput onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Encuentra tu película favorita");
    fireEvent.change(input, { target: { value: "matrix" } });

    expect(onSearch).toHaveBeenCalledWith("matrix");
  });

  it("calls onSearch with empty string when clearing input", () => {
    const onSearch = vi.fn();
    render(<SearchInput onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Encuentra tu película favorita");
    fireEvent.change(input, { target: { value: "matrix" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(onSearch).toHaveBeenLastCalledWith("");
  });
});
