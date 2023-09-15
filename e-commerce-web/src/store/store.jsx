import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {items: []},
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      const removedItemIndex = state.items.indexOf(action.payload);
      state.items.splice(removedItemIndex, 1);
    }
  }
});
export const store = configureStore({
  reducer: {cart: cartSlice.reducer}
});

export const cartActions = cartSlice.actions;