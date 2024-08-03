import { configureStore } from "@reduxjs/toolkit";

import allServicesSlice from "./services.slice";

export const store = configureStore({
  reducer: {
    services: allServicesSlice,
  }
});
