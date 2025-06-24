import { useEffect, useState } from "react";
import moviesData from "@/data/movies.json";
import { Movie } from "@/core/domain/models/Movie";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesData);

  useEffect(() => {
    const loadMovies = async () => {
      setMovies(moviesData);
    };

    loadMovies();
  }, []);

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
