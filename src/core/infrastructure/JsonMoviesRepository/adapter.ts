import { Movie } from "@/core/domain/models/Movie";
import { MoviesRepository } from "@/core/domain/repositories/MoviesRepository";
import moviesData from "@/data/movies.json";

export class JsonMoviesRepository implements MoviesRepository {
  private movies: Movie[];

  constructor() {
    this.movies = moviesData as Movie[];
  }

  async getMovies(): Promise<Movie[]> {
    return this.movies;
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const searchTerm = query.toLowerCase();
    return this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
  }
}
