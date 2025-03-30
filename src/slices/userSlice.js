import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {};
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { addUser, resetUser, setIsAdmin } = userSlice.actions;

export default userSlice.reducer;
