const API_URL = "https://movies-backend-biko2.vercel.app/api/like?token=5048";

interface UseLikeMovieReturn {
  likeMovie: () => Promise<void>;
}

export const useMovieLike = (): UseLikeMovieReturn => {
  const likeMovie = async (): Promise<void> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al dar like a la película");
    }

    await response.json();
  };

  return {
    likeMovie,
  };
};
