import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

import { apiSlice } from "../api/apiSlice";
import { sub } from "date-fns";

const productsAdapter:any = createEntityAdapter()

const initialState:any = productsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getProducts: builder.query({   
            query: () => '/products',
            providesTags:['Products']
        })
    })
 })

 export const {
    useGetProductsQuery,
   
} = extendedApiSlice