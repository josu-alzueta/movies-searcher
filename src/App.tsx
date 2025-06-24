import React from "react";
import { Movie } from "@/ui/components/Movies";
import { useMovies } from "@/ui/hooks/useMovies.ts";
import "./App.css";

export const App: React.FC = () => {
  const { movies, onSearch } = useMovies();

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎬 Movie Search</h1>
        <p className="subtitle">Encuentra tu película favorita</p>
      </header>

      <main className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Encuentra tu película favorita"
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {movies.length > 0 ? (
          <div className="movies-grid">
            {movies.map((movie) => (
              <Movie key={movie.id} title={movie.title} year={movie.year} />
            ))}
          </div>
        ) : (
          <p>No se encontraron películas</p>
        )}
      </main>
    </div>
  );
};
