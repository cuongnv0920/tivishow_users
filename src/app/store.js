import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";
import posterRducer from "../features/Poster/posterSlice";

const rootReducer = {
  user: userReducer,
  poster: posterRducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
