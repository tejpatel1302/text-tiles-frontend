import { createSlice } from "@reduxjs/toolkit";

const wishlistDeleteSlice = createSlice({
    name: 'wishListId',
    initialState: {
        wishListId: '' // Initial state is a string
    },
    reducers: {
        addWishListId(state, action) {
            state.wishListId = action.payload; // Update the categoryId with the new string
        },
    },
});

export const { addWishListId } = wishlistDeleteSlice.actions;
export default wishlistDeleteSlice.reducer;
