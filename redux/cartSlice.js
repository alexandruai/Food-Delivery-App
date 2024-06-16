import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const productIdToRemove = action.payload;
      const productToRemove = state.products.find(
        (product) => product._id === productIdToRemove
      );
      if (productToRemove) {
        state.total -= productToRemove.price * productToRemove.quantity;
        state.quantity -= 1;
        state.products = state.products.filter(
          (product) => product._id !== productIdToRemove
        );
      }
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;