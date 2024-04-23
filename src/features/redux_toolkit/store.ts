import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import addressReducer from './addressSlice';
import wishlistReducer from './wishlistSlice';
import { apiSlice } from '../api/apiSlice';
import authReducer from './authSlice'
import saReducer from './saSlice'
import userReducer from './userAuthSlice'
import addCategoryReducer from './addCategorySlice'


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer,
        product: productReducer,
        address: addressReducer,
        wishlist: wishlistReducer,
        adminAuth: authReducer,
        userAuth: userReducer,
        saAuth: saReducer,
        addCategory:addCategoryReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;
