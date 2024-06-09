import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
    listRoom: [],
  };

export const RoomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
      setListRoom: (state, action) => {
        state.listRoom = action.payload;
      },
    },
  });
  
  export const { setListRoom } = RoomSlice.actions;
  
  export const selectListRoom = (state: RootState) => state.room.listRoom;
  
  export default RoomSlice.reducer;
  