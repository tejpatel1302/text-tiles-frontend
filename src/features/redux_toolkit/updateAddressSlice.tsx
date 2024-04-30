import { createSlice } from "@reduxjs/toolkit";

const updatedAddressSlice = createSlice({
    name: 'updatedAddress',
    initialState: {
        updatedAddress: null // Initial state is a string
    },
    reducers: {
        addupdatedAddress(state, action) {
            state.updatedAddress = action.payload; // Update the categoryId with the new string
        },
    },
});

export const { addupdatedAddress } = updatedAddressSlice.actions;
export default updatedAddressSlice.reducer;
