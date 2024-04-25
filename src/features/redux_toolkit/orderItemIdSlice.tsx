import { createSlice } from "@reduxjs/toolkit";

const orderItemIdSlice = createSlice({
    name: 'orderItemId',
    initialState: {
        orderItemId: '',
        status: '', // Added comma and corrected typo
    },
    reducers: {
        addId(state, action) {
            state.orderItemId = action.payload; // Update the orderItemId with the new string
        },
        addStatus(state, action) {
            state.status = action.payload; // Update the status with the new string
        },
    },
});

export const { addId, addStatus } = orderItemIdSlice.actions; // Added addStatus
export default orderItemIdSlice.reducer;
