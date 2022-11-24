import { createSlice } from "@reduxjs/toolkit";

const toogleNextPage = createSlice({
  name: "toogleNextPage",
  initialState: {
    page: 1,
    component: {
      count: 0,
      name: "exchangeRate",
    },
  },
  reducers: {
    increase(state, action) {
      if (action.payload.name === "exchangeRate") {
        return {
          page: state.page + 1,
          component: {
            name: "exchangeRate",
            count: action.payload.count,
          },
        };
      } else {
        return {
          page: state.page + 1,
          component: {
            name: "interest",
            count: action.payload.count,
          },
        };
      }
    },

    decrease(state, action) {
      return {
        page: 1,
        component: {
          name: action.payload.name,
          count: 0,
        },
      };
    },
  },
});

const { actions, reducer } = toogleNextPage;
export const { increase, decrease } = actions;
export default reducer;
