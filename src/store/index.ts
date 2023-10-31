import { configureStore } from "@reduxjs/toolkit";

import { propertiesReducer } from "./properties.slice";

export * from "./properties.slice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
  },
});
