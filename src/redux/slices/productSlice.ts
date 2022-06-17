/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/semi */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getProducts from '../../fakeApi';
import Icat from '../../models/Icat';
import { RootState } from '../store';

interface ProductState {
  isLoading: boolean,
  products: Icat[],
  selected: number[]
}

const initialState: ProductState = {
  isLoading: true,
  products: [],
  selected: [],
};

export const fetchProducts = createAsyncThunk(
  'product/getAll',
  async () => {
    const data = await getProducts();
    return await data as Icat[];
  },
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addSelected: (state, action: PayloadAction<number>) => {
      state.selected.push(action.payload);
    },
    removeSelected: (state, action: PayloadAction<number>) => {
      state.selected = state.selected.filter((item) => (item !== action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
  },
})

export const { addSelected, removeSelected } = productSlice.actions

export const selectProducts = (state: RootState) => state.product.products;
export const selectProductsLoading = (state: RootState) => state.product.isLoading;
export const selectSelectedItems = (state: RootState) => state.product.selected;

export default productSlice.reducer;
