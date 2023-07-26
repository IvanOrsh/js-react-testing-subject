import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbAccessToken = import.meta.env.VITE_APP_TMDB_ACCESS_TOKEN;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    // get genres
    getGenres: builder.query({
      query: () => ({
        url: `genre/movie/list`,
        headers: {
          Authorization: `Bearer ${tmdbAccessToken}`,
        },
      }),
    }),

    // get movies by [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        let url;
        // get movies by search
        if (searchQuery) {
          url = `search/movie?query=${searchQuery}&page=${page}`;
        }

        // get movies by category
        else if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          url = `movie/${genreIdOrCategoryName}?page=${page}`;
        }

        // get movies by genres
        else if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          url = `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}`;
        }

        // get popular movies (default)
        else {
          url = `movie/popular?page=${page}`;
        }

        return {
          url,
          headers: {
            Authorization: `Bearer ${tmdbAccessToken}`,
          },
        };
      },
    }),

    // get movie
    getMovie: builder.query({
      query: (id) => ({
        url: `movie/${id}?append_to_response=videos,credits`,
        headers: {
          Authorization: `Bearer ${tmdbAccessToken}`,
        },
      }),
    }),

    // favorites & watchlisted
    getList: builder.query({
      query: ({ listName, accountId, page }) => ({
        url: `/account/${accountId}/${listName}?page=${page}`,
        headers: {
          Authorization: `Bearer ${tmdbAccessToken}`,
        },
      }),
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

    // discover! movie by actor id
    getMoviesByActor: builder.query({
      query: ({ actorId, page }) => ({
        url: `discover/movie?with_cast=${actorId}&page=${page}`,
        headers: {
          Authorization: `Bearer ${tmdbAccessToken}`,
        },
      }),
    }),

    // get movie with given actor - needs more research!
    getMoviesByActorAlt: builder.query({
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
  useGetMoviesByActorAltQuery,
  useGetListQuery,
} = tmdbApi;
