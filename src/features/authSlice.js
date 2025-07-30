import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  isAuthReady: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      state.isAuthReady = true;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.isAuthReady = true;
    },
    setAuthReady: (state) => {
      state.isAuthReady = true;
    },
  },
});

export const { login, logout, setAuthReady } = authSlice.actions;
export default authSlice.reducer;
