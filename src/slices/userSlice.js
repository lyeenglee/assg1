import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
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
  },
});

export const { addUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
