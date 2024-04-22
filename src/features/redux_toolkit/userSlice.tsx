import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'user',
    initialState: {
        userData: []
    },
    reducers: {
        add(state:any, action:any) {
            state.userData.push(action.payload);
        },
        remove(state, action) {
            state.userData = state.userData.filter((item:any) => item.id !== action.payload);
        },
    },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
