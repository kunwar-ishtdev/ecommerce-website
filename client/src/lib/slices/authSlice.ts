import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      try {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } catch (e) {}
    },
    logout: (state) => {
      state.userInfo = null;
      try {
        localStorage.removeItem('userInfo');
      } catch (e) {}
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
