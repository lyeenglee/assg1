import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    commentList: [],
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
    addComment: (state, action) => {
      state.commentList.push(...action.payload);
    },
    deleteComment: (state, action) => {
      state.commentList = state.commentList.filter(
        (comment) => comment.id !== Number(action.payload)
      );
    },
    editComment: (state, action) => {
      state.commentList = state.commentList.map((comment) =>
        comment.id === Number(action.payload.id)
          ? { ...comment, ...action.payload }
          : comment
      );
    },
    resetComment: (state) => {
      state.commentList = [];
    },
  },
});

export const {
  addPost,
  deletePost,
  editPost,
  resetPost,
  addComment,
  deleteComment,
  editComment,
  resetComment,
} = postSlice.actions;

export default postSlice.reducer;
