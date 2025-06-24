import { Movie } from "@/types/movie";
import moviesData from "@/data/movies.json";

export const useMovies = () => {
  const movies = moviesData as Movie[];

  return {
    movies,
  };
};
