import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAddress: builder.query({
      query: () => ({
        url: "/address",
        method: "GET",
        // body: {...formData},
        // headers: {
        //   'Content-Type': 'multipart/form-data'
          
        // },
      }),
    //   providesTags:['Address']
    }),
    updateAddress: builder.mutation({
        query: (reqData:any) => ({
          url: `/address/${reqData.addressId}`,
          method: "PATCH",
          body: reqData?.cred ,
        }),
        // invalidatesTags:['Address']
      }),
  }),
});

export const {
  useGetAddressQuery,
 useUpdateAddressMutation
} = productApiSlice;
