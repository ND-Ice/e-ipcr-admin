import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "evaluations",
  initialState: {
    loading: false,
    list: [],
    lastFetch: null,
    preview: {},
    errorMessage: null,
    successMessage: null,
    sortBy: {},
  },
  reducers: {
    evaluationsRequested: (evaluations, action) => {
      evaluations.loading = true;
    },
    evaluationsRequestFailed: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.errorMessage = action.payload;
    },
    evaluationsReceived: (evaluations, action) => {
      evaluations.list = action.payload;
      evaluations.loading = false;
      evaluations.lastFetch = Date.now();
    },
    ongoingEvaluationsReceived: (evaluations, action) => {
      evaluations.ongoing = action.payload;
      evaluations.loading = false;
    },
    pastEvaluationReceived: (evaluations, action) => {
      evaluations.past = action.payload;
      evaluations.loading = false;
    },
    evaluationAdded: (evaluations, action) => {
      evaluations.list.push(action.payload);
      evaluations.loading = false;
      evaluations.successMessage = {
        type: "Notice",
        message: "Added succesfully.",
      };
    },
    evaluationRemoved: (evaluations, action) => {
      evaluations.loading = false;
      evaluations.list.filter(
        (evaluation) => evaluation.id !== action.payload.id
      );
    },
    evaluationSorted: (evaluations, action) => {
      evaluations.sortBy = action.payload;
    },
    evaluationPreviewed: (evaluations, action) => {
      evaluations.preview = action.payload;
      evaluations.loading = false;
    },
  },
});

export const {
  evaluationAdded,
  evaluationRemoved,
  evaluationsRequested,
  evaluationsRequestFailed,
  evaluationsReceived,
  evaluationSorted,
  evaluationPreviewed,
} = slice.actions;
export default slice.reducer;

// selectors
// get evaluations
export const getEvaluations = createSelector(
  (state) => state.entities.evaluations,
  (evaluations) => evaluations
);

// get past evaluations
export const getPastEvaluations = createSelector(
  (state) => state.entities.evaluations.list,
  (evaluations) =>
    evaluations.filter((evaluation) => evaluation.isFinished === true)
);

// get ongoing evaluations
export const getOngoingEvaluations = createSelector(
  (state) => state.entities.evaluations.list,
  (evaluations) =>
    evaluations.filter((evaluation) => evaluation.isFinished === false)
);
