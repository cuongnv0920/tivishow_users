import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { posterApi } from "api";

export const create = createAsyncThunk("poster/create", async (payload) => {
  const data = await posterApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("poster/edit", async (payload) => {
  const data = await posterApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("poster/delete", async (payload) => {
  const data = await posterApi.delete(payload);

  return data;
});

const posterSlice = createSlice({
  name: "poster",
  initialState: {},
  reducers: {
    selected(state, action) {
      return (state = action.payload);
    },

    removeSelected(state) {
      return (state = {});
    },
  },
  extraReducers: {
    [create.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [edit.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [deleted.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = posterSlice;
export const { selected, removeSelected } = actions;
export default reducer;
