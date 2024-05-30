import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://aa3deb8b1c41d863.mokky.dev/movie");
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMovie = createAsyncThunk(
  "movies/getMovie",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://aa3deb8b1c41d863.mokky.dev/movie/" + id
      );
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (obj, { rejectWithValue, dispatch }) => {
    try {
      await fetch(`https://aa3deb8b1c41d863.mokky.dev/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      await dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ movieId, formData }, { rejectWithValue, dispatch }) => {
    try {
      await fetch(`https://aa3deb8b1c41d863.mokky.dev/movie/${movieId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await fetch(`https://aa3deb8b1c41d863.mokky.dev/movie/${id}`, {
        method: "DELETE",
      });
      await dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const MOVIE_THUNKS = {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovie,
};
