import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "../Header";

describe("Header Component", () => {
  it("renders with default title and subtitle", () => {
    render(
      <Header
        title="🎬 Movie Search"
        subtitle="Encuentra tu película favorita"
      />
    );

    expect(screen.getByText("🎬 Movie Search")).toBeInTheDocument();
    expect(
      screen.getByText("Encuentra tu película favorita")
    ).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    const customTitle = "Custom Movie App";
    render(
      <Header title={customTitle} subtitle="Encuentra tu película favorita" />
    );

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(
      screen.getByText("Encuentra tu película favorita")
    ).toBeInTheDocument();
  });

  it("renders with custom subtitle", () => {
    const customSubtitle = "Busca tus películas aquí";
    render(<Header title="🎬 Movie Search" subtitle={customSubtitle} />);

    expect(screen.getByText("🎬 Movie Search")).toBeInTheDocument();
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
  });

  it("renders with both custom title and subtitle", () => {
    const customTitle = "Custom Movie App";
    const customSubtitle = "Busca tus películas aquí";
    render(<Header title={customTitle} subtitle={customSubtitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customSubtitle)).toBeInTheDocument();
  });
});
