import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI } from '../../api/postsApi';

const initialState = {
    posts: {
        list: null,
        loading: false
    },
    postForView: {
        post: null,
        loading: false
    },
    freshPosts: {
        posts: null,
        loading: false
    }
};

export const getPostById = createAsyncThunk(
    'posts/fetchById',
    async (postid) => {
        return await postAPI.fetchById(postid);
    }
);

export const getPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        return await postAPI.fetchPosts();
    }
);

export const getFreshPosts = createAsyncThunk(
    'posts/fetchFreshPosts',
    async (limit) => {
        return await postAPI.fetchFreshPosts(limit);
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        editPost: (state, action) => {

        },
        addPost: (state, action) => {
            const newPost = { ...action.payload }
            newPost.id = new Date().getTime()
            state.posts.list = state.posts.list ? [action.payload, [...state.posts.list]] : [action.payload]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPostById.pending, (state) => {
            state.postForView = {
                post: null,
                loading: true
            };
        });

        builder.addCase(getPostById.fulfilled, (state, action) => {
            state.postForView = {
                post: action.payload,
                loading: false
            };
        });

        builder.addCase(getPosts.pending, (state) => {
            state.posts = {
                list: null,
                loading: true
            };
        });

        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = {
                list: action.payload,
                loading: false
            };
        });

        builder.addCase(getFreshPosts.pending, (state) => {
            state.freshPosts = {
                posts: null,
                loading: true
            };
        });

        builder.addCase(getFreshPosts.fulfilled, (state, action) => {
            state.freshPosts = {
                posts: action.payload,
                loading: false
            };
        });
    }
});

export const { editPost, addPost } = postsSlice.actions;

export default postsSlice.reducer;