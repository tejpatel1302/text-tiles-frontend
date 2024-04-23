import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddCategoryState {
  categories: any[]; // Replace 'any' with the type of your categories
}

const initialState: AddCategoryState = {
  categories: [],
};

const addCategorySlice = createSlice({
  name: 'addCategory',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<any>) => {
      state.categories.push(action.payload);
    },
  },
});

export const { addCategory } = addCategorySlice.actions;

export const selectCategories = (state: { addCategory: AddCategoryState }) =>
  state.addCategory.categories;

export default addCategorySlice.reducer;
