import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  remainingTime: number;
  emailVerified: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  remainingTime: 0,
  emailVerified: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setRemainingTime: (state, action: PayloadAction<number>) => {
      state.remainingTime = action.payload;
    },
    setEmailVerified: (state, action: PayloadAction<boolean>) => {
      state.emailVerified = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetAuth: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setAuthenticated,
  setRemainingTime,
  setEmailVerified,
  setLoading,
  setError,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;