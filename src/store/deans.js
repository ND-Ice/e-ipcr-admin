import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "deans",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    errorMessage: null,
    successMessage: null,
    sortBy: {},
  },
  reducers: {
    deansRequested: (deans, action) => {
      deans.loading = true;
    },
    deansRequestFailed: (deans, action) => {
      deans.loading = false;
      deans.errorMessage = action.payload;
    },
    deansReceived: (deans, action) => {
      deans.list = action.payload;
      deans.loading = false;
      deans.lastFetch = Date.now();
    },
    deansAdded: (deans, action) => {
      deans.list.push(action.payload);
      deans.loading = false;
      deans.successMessage = {
        type: "Notice",
        message: "Added succesfully.",
      };
    },
    deansRemoved: (deans, action) => {
      const updated = deans.list.filter(
        (dean) => dean._id !== action.payload.id
      );
      deans.list = updated;
    },
    deansStatusCleared: (deans, action) => {
      deans.successMessage = null;
      deans.errorMessage = null;
    },
    deansSorted: (deans, action) => {
      deans.sortBy = action.payload;
    },
    activateDeanAccount: (deans, action) => {
      const { id, dean } = action.payload;
      const deanIdx = deans.list.findIndex((dean) => dean._id === id);
      deans.list[deanIdx] = dean;
    },
  },
});

export const {
  deansAdded,
  deansRemoved,
  deansRequested,
  deansRequestFailed,
  deansReceived,
  deansStatusCleared,
  deansSorted,
  activateDeanAccount,
} = slice.actions;
export default slice.reducer;

// action creators
export const clearStatus = () => deansStatusCleared();

// selectors
export const getDeans = createSelector(
  (state) => state.entities.deans,
  (deans) => deans
);
