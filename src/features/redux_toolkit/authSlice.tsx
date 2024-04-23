import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user : string | null
  token: string | null;
}

interface Credentials {
    user : string
  token: string;
}

const initialState: AuthState = {
 user:null,
  token: null
};

const authSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Credentials>) => {
      const { data }:any = action.payload;
      state.user = data.updatedAdminSession
      state.token = data.token;
    },
    logOut: (state:any) => {
    
      state.token = null;
    }
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectAdminCurrentUser = (state: { adminAuth: AuthState }) => state.adminAuth.user;
export const selectAdminCurrentToken = (state: { adminAuth: AuthState }) => state.adminAuth?.token;
