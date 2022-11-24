import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";
import posterReducer from "../features/Poster/posterSlice";
import sourceReducer from "../features/Source/sourceSlice";
import toogleNextPage from "../features/Home/homeSlice";

const rootReducer = {
  user: userReducer,
  poster: posterReducer,
  source: sourceReducer,
  toogleNextPage: toogleNextPage,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
