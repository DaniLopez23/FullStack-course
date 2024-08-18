import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    closeNotification(state, action) {
      return "";
    }
  },
});

export const { setNotification, closeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;