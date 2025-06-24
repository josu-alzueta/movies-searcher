import { useEffect, useState } from "react";
import moviesData from "@/data/movies.json";
import { Movie } from "@/core/domain/models/Movie";
import { moviesService } from "@/core/application/movies/moviesService";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>(moviesData);

  useEffect(() => {
    const loadMovies = async () => {
      const movies = await moviesService.getMovies();
      setMovies(movies);
    };

    loadMovies();
  }, []);

  const onSearch = async (search: string) => {
    const movies = await moviesService.searchMovies(search);
    setMovies(movies);
  };

  return {
    movies,
    onSearch,
  };
};
