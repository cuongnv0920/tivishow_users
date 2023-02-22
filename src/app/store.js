import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/Home/homeSlice";
import authReducer from "../features/Auth/authSlice";
import filmReducer from "../features/Film/filmSlice";
import posterReducer from "../features/Poster/posterSlice";
import marginReducer from "../features/Margin/marginSlice";
import depositReducer from "../features/Deposit/depositSlice";
import userReducer from "../features/Users/userSlice";

const rootReducer = {
  home: homeReducer,
  auth: authReducer,
  film: filmReducer,
  poster: posterReducer,
  margin: marginReducer,
  deposit: depositReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
