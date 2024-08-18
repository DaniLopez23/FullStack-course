import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    closeNotification(state, action) {
      return "";
    },
  },
});

export const setNotification = (msg, time) => {
  return (dispatch) => {
    dispatch(showNotification(msg))
    setTimeout(() => {
      dispatch(closeNotification());
    }, time*1000);
  };
};

export const { showNotification, closeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
