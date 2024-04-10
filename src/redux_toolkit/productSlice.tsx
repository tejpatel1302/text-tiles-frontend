import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

interface ProductState {
    data: any[]; // Change 'any[]' to the type of your product data
    status: string;
}

const initialState: ProductState = {
    data: [],
    status: STATUSES.IDLE,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;


export const fetchProducts:any = (category:any) => async (dispatch:any) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
        const res = await axios.get(`https://fakestoreapi.com/products/${category}`);
        dispatch(setProducts(res.data));
        dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
        dispatch(setStatus(STATUSES.ERROR));
    }
};
