import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomId: "",
    listRoom: [],
  },
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setRooms: (state, action) => {
      state.listRoom = action.payload;
    },
  },
});

export const roomsSelector = (state: any) => state.room;
