import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";
import posterReducer from "../features/Poster/posterSlice";
import sourceReducer from "../features/Source/sourceSlice";

const rootReducer = {
  user: userReducer,
  poster: posterReducer,
  source: sourceReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
