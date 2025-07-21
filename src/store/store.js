import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    // Add your slices here
  },
});

export default store;
