import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    adminlogin: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    userlogin: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    adminregister: builder.mutation({
      query: (credentials: any) => ({
        url: "/user/admin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    userregister: builder.mutation({
      query: (credentials: any) => ({
        url: "/user",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    salogin: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/erp/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    userForgotPass: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/user/reset-password",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    userLogout: builder.mutation({
        query: () => ({
          url: "/auth/user/logout",
          method: "POST",
   
        }),
      }),
      adminLogout: builder.mutation({
        query: () => ({
          url: "/auth/admin/logout",
          method: "POST",
         
        }),
      }),
    adminForgotPass: builder.mutation({
        query: (credentials: any) => ({ 
          url: "/auth/admin/logout",
          method: "POST",
          body: { ...credentials },
        }),
      }),
  }),
});

export const {
  useAdminloginMutation,
  useAdminregisterMutation,
  useUserloginMutation,
  useUserregisterMutation,
  useSaloginMutation,
  useAdminForgotPassMutation,
  useUserLogoutMutation,
  useUserForgotPassMutation,
  useAdminLogoutMutation
} = authApiSlice;
