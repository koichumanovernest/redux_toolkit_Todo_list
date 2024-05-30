import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "./slice/movieSlice";

const store = configureStore({
  reducer: {
    [movieSlice.name]: movieSlice.reducer,
  },
});

export { store };
