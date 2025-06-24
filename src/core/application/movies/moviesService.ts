import { JsonMoviesRepository } from "@/core/infrastructure/JsonMoviesRepository/adapter";

const repository = new JsonMoviesRepository();

export const moviesService = {
  getMovies: async () => {
    const movies = await repository.getMovies();
    return movies;
  },

  searchMovies: async (query: string) => {
    const movies = await repository.searchMovies(query);
    return movies;
  },
};
