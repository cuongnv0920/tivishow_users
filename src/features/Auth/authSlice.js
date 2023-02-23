import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, userApi } from "api";
import StorageKeys from "configs/StorageKeys.conf";

export const login = createAsyncThunk("user/login", async (payload) => {
  // call API to login
  const data = await authApi.login(payload);

  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.user;
});

const userSlice = createSlice({
  name: "auth",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);

      state.current = {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
