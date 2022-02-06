import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "faculties",
  initialState: {
    loading: false,
    list: [],
    preview: null,
    lastFetch: null,
    errorMessage: null,
    successMessage: null,
    sortBy: {},
  },
  reducers: {
    facultyRequested: (faculties, action) => {
      faculties.loading = true;
    },
    facultyReceived: (faculties, action) => {
      faculties.list = action.payload;
      faculties.loading = false;
      faculties.lastFetch = Date.now();
    },
    facultyRequestFailed: (faculties, action) => {
      faculties.loading = false;
      faculties.errorMessage = action.payload;
    },
    facultyAdded: (faculties, action) => {
      faculties.list.push(action.payload);
      faculties.loading = false;
      faculties.errorMessage = null;
      faculties.successMessage = {
        type: "Notice",
        message: "Added succesfully.",
      };
    },
    activateFaculty: (faculties, action) => {
      const { id, faculty } = action.payload;
      const facultyIdx = faculties.list.findIndex(
        (faculty) => faculty._id === id
      );
      faculties.list[facultyIdx] = faculty;
    },
    facultyRemoved: (faculties, action) => {
      const updated = faculties.list.filter(
        (faculty) => faculty._id !== action.payload.id
      );
      faculties.list = updated;
    },
    facultyStatusCleared: (faculties, action) => {
      faculties.errorMessage = null;
      faculties.successMessage = null;
    },
    facultyPreviewed: (faculties, action) => {
      faculties.preview = action.payload;
      faculties.loading = false;
    },
    facultySorted: (faculties, action) => {
      faculties.sortBy = action.payload;
    },
  },
});

export const {
  facultyReceived,
  facultyAdded,
  facultyRemoved,
  facultyRequestFailed,
  facultyRequested,
  facultyStatusCleared,
  facultyPreviewed,
  facultySorted,
  activateFaculty,
} = slice.actions;
export default slice.reducer;

// action creators
export const clearStatus = () => facultyStatusCleared();

// selectors
export const getFaculties = createSelector(
  (state) => state.entities.faculties,
  (faculties) => faculties
);
