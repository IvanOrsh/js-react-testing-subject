import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_APP_TMDB_KEY;
const tmdbAccessToken = import.meta.env.VITE_APP_TMDB_ACCESS_TOKEN;

// `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&language=en-US&page=1`;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    // get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // get movies by [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // get movies by search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&&api_key=${tmdbApiKey}`;
        }

        // get movies by category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // get movies by genres
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // get popular movies (default)
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    // get movie
    getMovie: builder.query({
      query: (id) =>
        `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    // get user specific list
    getRecommendations: builder.query({
      query: (movieId) => ({
        url: `movie/${movieId}/recommendations`,
        headers: {
          Authorization: `Bearer ${tmdbAccessToken}`,
        },
      }),
    }),

    // get actor
    getActor: builder.query({
      query: (actorId) => ({
        url: `person/${actorId}`,
        headers: {
          Authorization: `Bearer ${tmdbAccessToken}`,
        },
      }),
    }),

    // get movie with given actor
    getMoviesByActor: builder.query({
      query: (actorId) => ({
        url: `person/${actorId}/movie_credits`,
        headers: {
          Authorization: `Bearer ${tmdbAccessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorQuery,
} = tmdbApi;
