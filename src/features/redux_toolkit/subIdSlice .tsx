import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubIdState {
  subId: string;
}

const initialState: SubIdState = {
  subId: ''
};

const subIdSlice = createSlice({
  name: 'subId',
  initialState,
  reducers: {
    addId(state, action: PayloadAction<string>) {
      state.subId = action.payload;
    },
  },
});

export const { addId: addSubId } = subIdSlice.actions;
export default subIdSlice.reducer;
