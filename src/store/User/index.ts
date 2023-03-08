import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    friendList: [],
    id: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setFriendList: (state, action) => {
      state.friendList = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const userSelector = (state: any) => state.user;
