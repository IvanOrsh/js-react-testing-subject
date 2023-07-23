import { useState, useEffect } from "react";
import axios from "axios";

const tmdbAccessToken = import.meta.env.VITE_APP_TMDB_ACCESS_TOKEN;

const useMovieInteraction = (
  user,
  movieId,
  favoriteMovies,
  watchlistMovies,
) => {
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const addToFavorites = async () => {
    const url = `https://api.themoviedb.org/3/account/${user.id}/favorite`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${tmdbAccessToken}`,
      },
    };

    try {
      const response = await axios.post(
        url,
        {
          media_type: "movie",
          media_id: movieId,
          favorite: !isMovieFavorited,
        },
        options,
      );
      setIsMovieFavorited((prev) => !prev);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWatchlist = async () => {
    const url = `https://api.themoviedb.org/3/account/${user.id}/watchlist`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${tmdbAccessToken}`,
      },
    };

    try {
      const response = await axios.post(
        url,
        {
          media_type: "movie",
          media_id: movieId,
          watchlist: !isMovieWatchlisted,
        },
        options,
      );
      setIsMovieWatchlisted((prev) => !prev);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const isFavorited = favoriteMovies?.results.find(
      (movie) => movie?.id === parseInt(movieId, 10),
    );
    setIsMovieFavorited(!!isFavorited);

    const isWatchlisted = watchlistMovies?.results.find(
      (movie) => movie?.id === parseInt(movieId, 10),
    );
    setIsMovieWatchlisted(!!isWatchlisted);
  }, [user, movieId]);

  return {
    isMovieFavorited,
    isMovieWatchlisted,
    addToFavorites,
    addToWatchlist,
  };
};

export default useMovieInteraction;
