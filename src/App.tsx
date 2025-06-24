import React from "react";
import { Movie } from "@/ui/components/Movies";
import { SearchInput } from "@/ui/components/SearchInput";
import { Header } from "@/ui/components/Header";
import { useMovies } from "@/ui/hooks/useMovies";
import "./App.css";
import { useMovieLike } from "./ui/hooks/useMovieLike";

export const App: React.FC = () => {
  const { movies, onSearch } = useMovies();
  const { likeMovie } = useMovieLike();
  return (
    <div className="App">
      <Header
        title="🎬 Movie Search"
        subtitle="Encuentra tu película favorita"
      />

      <main className="main-content">
        <SearchInput onSearch={onSearch} />

        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Movie
                key={movie.id}
                title={movie.title}
                year={movie.year}
                onLike={likeMovie}
              />
            ))
          ) : (
            <p>No se encontraron películas</p>
          )}
        </div>
      </main>
    </div>
  );
};
