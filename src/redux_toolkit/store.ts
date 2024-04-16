import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import addressReducer from './addressSlice';
import wishlistReducer from './wishlistSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        address: addressReducer,
        wishlist: wishlistReducer
    },
});

export default store;
