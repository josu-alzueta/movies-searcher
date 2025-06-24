import React from "react";
import { Movie } from "@/ui/components/Movies";
import { SearchInput } from "@/ui/components/SearchInput";
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
        <SearchInput onSearch={onSearch} />

        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Movie key={movie.id} title={movie.title} year={movie.year} />
            ))
          ) : (
            <p>No se encontraron películas</p>
          )}
        </div>
      </main>
    </div>
  );
};
