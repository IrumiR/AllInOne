import { configureStore } from "@reduxjs/toolkit";

import allServicesSlice from "./services.slice";
import authSlice  from "./auth.slice";
import loadingSlice from "./loading.slice";
import userSlice from "./user.slice";
import allProductsSlice from "./products.slice";
import cartSlice from "./cart.slice";

export const store = configureStore({
  reducer: {
    services: allServicesSlice,
    auth: authSlice,
    loading: loadingSlice,
    user: userSlice,
    products: allProductsSlice,
    cart: cartSlice,
  }
});
