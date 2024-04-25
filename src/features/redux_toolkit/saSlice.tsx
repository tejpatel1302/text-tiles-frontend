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
    setCredentials3: (state, action: PayloadAction<Credentials>) => {
      const { data }:any = action.payload;
      state.user = data?.updatedSession
      state.token = data?.token;
    },
    salogOut: (state) => {
    
      state.token = null;
    }
  },
});

export const { setCredentials3, salogOut } = saAuthSlice.actions;

export default saAuthSlice.reducer;

export const selectSACurrentUser = (state: { saAuth: AuthState }) => state.saAuth.user;
export const selectSACurrentToken = (state: { saAuth: AuthState }) => state.saAuth.token;
