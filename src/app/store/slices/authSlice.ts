// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
}

const initialAuthState = localStorage.getItem('isAuth') === 'true';

const initialState: AuthState = { isAuth: initialAuthState };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuthStatus: (state) => {
      state.isAuth = !state.isAuth;
      localStorage.setItem('isAuth', state.isAuth.toString());
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      localStorage.setItem('isAuth', action.payload.toString());
    },
  },
});

export const { toggleAuthStatus, setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
