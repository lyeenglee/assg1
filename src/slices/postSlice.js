import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: { title: "", subtitle: "", description: "" },
    postList: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.postList.push(...action.payload);
    },
    resetPost: (state) => {
      state.postList = [];
    },
  },
});

export const { addPost, resetPost } = postSlice.actions;
export default postSlice.reducer;
