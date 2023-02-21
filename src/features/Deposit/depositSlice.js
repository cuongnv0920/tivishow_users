import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { depositApi } from "api";

export const create = createAsyncThunk("deposit/create", async (payload) => {
  const data = await depositApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("deposit/edit", async (payload) => {
  const data = await depositApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("deposit/delete", async (payload) => {
  const data = await depositApi.delete(payload);

  return data;
});

export const effect = createAsyncThunk("deposit/effect", async (payload) => {
  const data = await depositApi.effect(payload);

  return data;
});

const depositSlice = createSlice({
  name: "deposit",
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

const { actions, reducer } = depositSlice;
export const { selected, removeSelected } = actions;
export default reducer;
