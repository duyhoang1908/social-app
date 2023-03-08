import { configureStore } from "@reduxjs/toolkit";
import { modalSlide } from "./Modal";
import { roomSlice } from "./Room";
import { userSlice } from "./User";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    room: roomSlice.reducer,
    modal: modalSlide.reducer,
  },
});

export default store;
