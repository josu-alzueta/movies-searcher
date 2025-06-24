import { useState } from "react";
import { Movie } from "@/types/movie";
import moviesData from "@/data/movies.json";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesData);

  const onSearch = (search: string) => {
    setMovies(
      moviesData.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return {
    movies,
    onSearch,
  };
};
