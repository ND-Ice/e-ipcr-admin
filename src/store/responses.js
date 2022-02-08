import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "responses",
  initialState: {
    list: [],
    sortBy: {},
  },
  reducers: {
    evaluationResponseReceived: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { evaluationResponseReceived } = slice.actions;
export default slice.reducer;

// selectors
export const getResponses = createSelector(
  (state) => state.entities.responses,
  (response) => response
);
