import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    currentUser: {},
    errorMessage: null,
  },
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;
    },
    userReceived: (user, action) => {
      user.loading = false;
      user.currentUser = action.payload;
      user.errorMessage = null;
    },
    userLoggedOut: (user, action) => {
      user.currentUser = null;
    },
    userRequestFailed: (user, action) => {
      user.loading = false;
      user.errorMessage = action.payload;
    },
  },
});

export const { userReceived, userLoggedOut, userRequested, userRequestFailed } =
  slice.actions;
export default slice.reducer;

export const getUser = createSelector(
  (state) => state.user,
  (user) => user
);
