import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { marginApi } from "api";

export const create = createAsyncThunk("margin/create", async (payload) => {
  const data = await marginApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("margin/edit", async (payload) => {
  const data = await marginApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("margin/delete", async (payload) => {
  const data = await marginApi.delete(payload);

  return data;
});

const marginSlice = createSlice({
  name: "margin",
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

const { actions, reducer } = marginSlice;
export const { selected, removeSelected } = actions;
export default reducer;
