import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notificaitons",
  initialState: {
    loading: false,
    list: [],
  },
  reducers: {
    notificationsReceived: (notifications, action) => {
      notifications.list = action.payload;
    },
    notificationsAdded: (notifications, action) => {
      notifications.list.push(action.payload);
    },
  },
});

const { notificationsReceived, notificationsAdded } = slice.actions;
export default slice.reducer;

export const addNotification = (notification) => {
  return notificationsAdded(notification);
};

export const getNotifications = () => notificationsReceived();
