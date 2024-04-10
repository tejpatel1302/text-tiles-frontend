import { createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state:any, action:any) {
            state.push(action.payload);
        },
        remove(state:any, action:any) {
            return state.filter((item:any) => item.id !== action.payload);
        },
    },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
