import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice.js"

import cartReducer from "../features/cart/cartSlice.js"

const store = configureStore({
      reducer: {
            product: productReducer,
            cart: cartReducer
      }
});

export default store;