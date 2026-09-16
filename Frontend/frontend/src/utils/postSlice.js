import { createSlice } from '@reduxjs/toolkit'



export const postSlice = createSlice({
     name: 'post',
    initialState: {
    likes: [],
    comments: [],
    ...(JSON.parse(localStorage.getItem("selectedPost")) || {})
},

     reducers: {
          addSelectedPost: (state, action) => {
               localStorage.setItem("selectedPost", JSON.stringify(action.payload))
               return action.payload
          },
          deleteSelectedPost: (state) => {
               localStorage.removeItem("selectedPost")
               return { }
          },
          likePost: (state, action) => {
               if (state.likes.includes(action.payload)) {
                    state.likes = state.likes.filter((like) => like !== action.payload);
               } else {
                    state.likes = [...state.likes, action.payload];
               }
          },
          setComments(state, action) {
               state.comments = [action.payload, ...state.comments]
          },
          deleteComments(state, action) {
               state.comments = state.comments.filter(
                    (comment) => comment._id !== action.payload,
               )
          },
          commentLike: (state, action) => {
               let { commentId, userId } = action.payload;
               let comment = state.comments.find((comment) => comment._id == commentId);
               if (comment.likes.includes(userId)) {
                    comment.likes = comment.likes.filter((like) => like !== userId);
               } else {
                    comment.likes = [...comment.likes, userId];
               }
               return state;
          },
          updateComments(state, action) {
               const { commentId, newComment } = action.payload;
               const comment = state.comments.find((c) => c._id === commentId);
               if (comment) {
                    comment.comment = newComment
               }
          },
     },
})

// Action creators are generated for each case reducer function
export const { addSelectedPost, deleteSelectedPost, likePost, setComments, deleteComments, commentLike, updateComments } = postSlice.actions

export default postSlice.reducer