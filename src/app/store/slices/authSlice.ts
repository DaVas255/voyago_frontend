// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = { isAuth: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuthStatus: (state) => {
      state.isAuth = !state.isAuth;
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { toggleAuthStatus, setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
