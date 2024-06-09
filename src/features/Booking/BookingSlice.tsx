import { createSlice } from '@reduxjs/toolkit';

export interface BookingState {
    data: any[];
}

const initialState: BookingState = {
    data: [],
};

export const BookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setDataBooking: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setDataBooking } = BookingSlice.actions;

export const selectDataBooking = (state: any) => state.booking.data;


export default BookingSlice.reducer;
