import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addressData: []
    },
    reducers: {
        addAddress(state:any, action:any) {
            state.addressData.push(action.payload);
        },
       
    },
});

export const { addAddress } = addressSlice.actions;
export default addressSlice.reducer;
