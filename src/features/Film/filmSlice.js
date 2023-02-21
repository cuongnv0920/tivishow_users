import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filmApi } from "api";

export const create = createAsyncThunk("film/create", async (payload) => {
  const data = await filmApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("film/edit", async (payload) => {
  const data = await filmApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("film/delete", async (payload) => {
  const data = await filmApi.delete(payload);

  return data;
});

const filmSlice = createSlice({
  name: "film",
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

const { actions, reducer } = filmSlice;
export const { selected, removeSelected } = actions;
export default reducer;
