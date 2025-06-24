import React from "react";
import { Movie as MovieType } from "@/types/movie";

type MovieProps = Pick<MovieType, "title" | "year">;

export const Movie: React.FC<MovieProps> = ({ title, year }) => {
  return (
    <div className="movie-card">
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{year}</p>
      </div>
    </div>
  );
};
