import { createSlice } from "@reduxjs/toolkit";
import StorageKeys from "../../configs/StorageKeys.conf";

const editPoster = createSlice({
  name: "editPoster",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.POSTER)) || {},
  },
  reducers: {
    removeLocalStoragePoster(state) {
      localStorage.removeItem(StorageKeys.POSTER);
      state.current = {};
    },
  },
});

const { actions, reducer } = editPoster;
export const { removeLocalStoragePoster } = actions;
export default reducer;
