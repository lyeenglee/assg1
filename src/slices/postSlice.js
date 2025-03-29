import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.postList.push(...action.payload);
    },
    deletePost: (state, action) => {
      state.postList = state.postList.filter(
        (post) => post.id !== Number(action.payload)
      );
    },
    editPost: (state, action) => {
      state.postList = state.postList.map((post) =>
        post.id === Number(action.payload.id)
          ? { ...post, ...action.payload }
          : post
      );
    },
    resetPost: (state) => {
      state.postList = [];
    },
  },
});

export const { addPost, deletePost, editPost, resetPost } = postSlice.actions;
export default postSlice.reducer;
