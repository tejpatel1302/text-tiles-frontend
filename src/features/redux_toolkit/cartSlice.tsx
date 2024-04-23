import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: []
    },
    reducers: {
        add(state:any, action:any) {
            state.cartData.push(action.payload);
        },
        remove(state, action) {
            state.cartData = state.cartData.filter((item:any) => item.id !== action.payload);
        },
    },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
