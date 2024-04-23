import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/category",
        method: "POST",
        body: {...formData},
        headers: {
          'Content-Type': 'multipart/form-data'
          
        },
      }),
    }),
  }),
});

export const {
  useAddCategoryMutation
} = productApiSlice;
