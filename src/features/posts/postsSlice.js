import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import client from "../../utils";

const POSTS_URL = "posts";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get(POSTS_URL);
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  const response = await client.post('posts',initialPost);
  return response.data
})

// const initialState = [
//   {
//     id: "1",
//     title: "Learning redux toolkit",
//     content: `I've heard good things about redux toolkit`,
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: "2",
//     title: "Slices",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     content: "The more i say slice, the more i crave for pizza",
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
// ];

const initialState = {
  posts: [],
  status: 'idle', // 'idle | 'loading' | 'succeeded' | 'failed'
  error: null
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
      reducer(state, action) {
        // don't need to write like return [...state, action.payload]
        // because immer js under the hood automatically do this.

        state.posts.push(action.payload);
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;

      const existingPost = state.posts.find((post) => post.id == postId);

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading'
    }),
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // add date and reactions

        let min = 1;

        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          }

          return post;
        })

        state.posts = loadedPosts;
      }),
      builder.addCase(fetchPosts.rejected, (state,action)=> {
        state.status = 'failed';
        state.error = action.error.message
      }),
      builder.addCase(addNewPost.fulfilled, (state,action)=>{
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        }

        state.posts.push(action.payload);
      })
  }
});

export const selectAllPosts = (state) => state.posts.posts;

export const getPostsStatus = (state) => state.posts.status;

export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
