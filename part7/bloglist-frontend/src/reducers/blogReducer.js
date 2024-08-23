import { createSlice, current } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload.id;
      return state.map((blog) => (blog.id !== id ? blog : action.payload));
    },

    appendBlog(state, action) {
      state.push(action.payload);
    },

    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { updateBlog, appendBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;