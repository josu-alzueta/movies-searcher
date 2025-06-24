import React, { useState } from "react";
import { Movie as MovieType } from "@/core/domain/models/Movie";

type MovieProps = Pick<MovieType, "title" | "year"> & {
  onLike: () => Promise<void>;
};

export const Movie: React.FC<MovieProps> = ({ title, year, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    await onLike();
  };

  return (
    <div className="movie-card">
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{year}</p>
      </div>
      <button className="like-button" onClick={handleLikeClick} type="button">
        {isLiked ? "❤️" : "🤍"} Me gusta
      </button>
    </div>
  );
};
