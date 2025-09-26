import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userNickname: null,
  // Add other user data here if needed (e.g., userId)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action called when login is successful
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userNickname = action.payload.nickname;
      // In a real app, you might save a token to local storage here
    },
    // Action called when user logs out or session expires
    logout: (state) => {
      state.isAuthenticated = false;
      state.userNickname = null;
      // In a real app, you would remove the token from local storage/cookies here
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserNickname = (state) => state.auth.userNickname;

export default authSlice.reducer;