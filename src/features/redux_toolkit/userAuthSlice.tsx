import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userAuthState {
  user: string | null;
  token: string | null;
}

interface Credentials {
  user: string;
  token: string;
}

const initialState: userAuthState = {
  user: null,
  token: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCredentials2: (state, action: PayloadAction<Credentials>) => {
      const { data }: any = action.payload;
      state.user = data.updatedcustomerSession;
      state.token = data.token;
    },
    userlogOut: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials2, userlogOut } = userAuthSlice.actions;

export default userAuthSlice.reducer;

export const selectUserCurrentUser = (state: { userAuth: userAuthState }) =>
  state.userAuth.user;
export const selectUserCurrentToken = (state: { userAuth: userAuthState }) =>
  state.userAuth.token;
