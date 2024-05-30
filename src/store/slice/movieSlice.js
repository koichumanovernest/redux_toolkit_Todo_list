import { createSlice } from "@reduxjs/toolkit";
import { MOVIE_THUNKS } from "./movieThunk";

const initialState = {
  movies: [],
  movie: null,
  isLoading: false,
};

const addAsyncCases = (builder, asyncThunk) => {
  builder

    .addCase(asyncThunk.pending, (state) => {
      state.isLoading = true;
    })

    .addCase(asyncThunk.rejected, (state) => {
      state.isLoading = false;
    });
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    addAsyncCases(builder, MOVIE_THUNKS.deleteMovie);
    addAsyncCases(builder, MOVIE_THUNKS.addMovie);
    addAsyncCases(builder, MOVIE_THUNKS.updateMovie);
    addAsyncCases(builder, MOVIE_THUNKS.getMovie);
    addAsyncCases(builder, MOVIE_THUNKS.getMovies);

    builder

      .addCase(MOVIE_THUNKS.getMovies.fulfilled, (state, { payload }) => {
        state.movies = payload;
        state.isLoading = false;
      })

      .addCase(MOVIE_THUNKS.deleteMovie.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(MOVIE_THUNKS.addMovie.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(MOVIE_THUNKS.getMovie.fulfilled, (state, { payload }) => {
        state.movie = payload;
        state.isLoading = false;
      })

      .addCase(MOVIE_THUNKS.updateMovie.fulfilled, (state) => {
        state.movie = null;
        state.isLoading = false;
      });
  },
});
