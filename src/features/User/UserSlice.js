import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList: (state, actions) => {
      state.userList = actions.payload;
    },
  },
});

export const { setUserList } = UserSlice.actions;

export const selectUserList = (state) => state.user.userList;

export default UserSlice.reducer;
