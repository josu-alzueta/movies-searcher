import React, { useState } from "react";
import { Movie as MovieType } from "@/types/movie";
import "./App.css";
import { useMovies } from "@/ui/hooks/useMovies.ts";

type MovieProps = Pick<MovieType, "title" | "year">;

const Movie: React.FC<MovieProps> = ({ title, year }) => {
  return (
    <div className="movie-card">
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{year}</p>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { movies } = useMovies();

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="movies-grid">
          {movies.map((movie) => (
            <Movie key={movie.id} title={movie.title} year={movie.year} />
          ))}
        </div>

        <div className="placeholder">
          <p>
            📝 <strong>Tu tarea:</strong> Crear un buscador que permita filtrar
            películas por título
          </p>
          <p>
            📊 <strong>Datos disponibles:</strong> {movies.length} películas en
            el archivo movies.json
          </p>
        </div>
      </main>
    </div>
  );
};
