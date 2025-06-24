import { Movie } from "@/core/domain/models/Movie";

export interface MoviesRepository {
  getMovies(): Promise<Movie[]>;
  searchMovies(query: string): Promise<Movie[]>;
}
