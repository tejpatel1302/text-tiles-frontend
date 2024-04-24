import { createSlice } from "@reduxjs/toolkit";

const categoryIdSlice = createSlice({
    name: 'categoryId',
    initialState: {
        categoryId: '' // Initial state is a string
    },
    reducers: {
        addId(state, action) {
            state.categoryId = action.payload; // Update the categoryId with the new string
        },
    },
});

export const { addId } = categoryIdSlice.actions;
export default categoryIdSlice.reducer;
