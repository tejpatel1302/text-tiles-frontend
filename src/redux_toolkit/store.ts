import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import addressReducer from './addressSlice';


const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        address: addressReducer,
    },
});

export default store;
