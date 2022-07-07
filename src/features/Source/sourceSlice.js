import { createSlice } from "@reduxjs/toolkit";
import StorageKeys from "../../configs/StorageKeys.conf";

const editSource = createSlice({
  name: "editSource",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.SOURCE)) || {},
  },
  reducers: {
    removeLocalStorageSource(state) {
      localStorage.removeItem(StorageKeys.SOURCE);
      state.current = {};
    },
  },
});

const { actions, reducer } = editSource;
export const { removeLocalStorageSource } = actions;
export default reducer;
