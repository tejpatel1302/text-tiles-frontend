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

const saAuthSlice = createSlice({
  name: 'saAuth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Credentials>) => {
      const { data }:any = action.payload;
      state.user = data.updatedAdminSession
      state.token = data.token;
    },
    salogOut: (state) => {
    
      state.token = null;
    }
  },
});

export const { setCredentials, salogOut } = saAuthSlice.actions;

export default saAuthSlice.reducer;

export const selectSACurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectSACurrentToken = (state: { auth: AuthState }) => state.auth.token;
