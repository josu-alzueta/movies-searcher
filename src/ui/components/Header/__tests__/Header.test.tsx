import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "../Header";

const defaultProps = {
  title: "🎬 Movie Search",
  subtitle: "Encuentra tu película favorita",
};

describe("Header Component", () => {
  it("renders with title and subtitle", () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText("🎬 Movie Search")).toBeInTheDocument();
    expect(
      screen.getByText("Encuentra tu película favorita")
    ).toBeInTheDocument();
  });
});
