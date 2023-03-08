import { createSlice } from "@reduxjs/toolkit";

export const modalSlide = createSlice({
  name: "modal",
  initialState: {
    statusModal: false,
  },
  reducers: {
    toggleStatusModal: (state) => {
      state.statusModal = !state.statusModal;
    },
  },
});

export const modalSelector = (state: any) => state.modal;
