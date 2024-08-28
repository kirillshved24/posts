import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI } from '../../api/postsApi';

const initialState = {
    posts: {
        list: [],
        loading: false,
        sortType: 'TITLE_ASC',
        currentPage: 1,
        totalPosts: 0
    },
    postForView: {
        post: null,
        loading: false
    },
    freshPosts: {
        posts: [],
        loading: false
    }
};

export const getPostById = createAsyncThunk(
    'posts/fetchById',
    async (postId) => {
        console.log('Запрос на получение поста по ID:', postId); // Лог
        const post = await postAPI.fetchById(postId);
        console.log('Получен пост по ID:', post); // Лог
        return post;
    }
);

export const getPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({ page = 1, limit = 10 }) => {
        console.log('Запрос на получение постов:', { page, limit }); // Лог
        const response = await postAPI.fetchPosts(page, limit);
        console.log('Получены посты:', response); // Лог
        return response;
    }
);

export const getFreshPosts = createAsyncThunk(
    'posts/fetchFreshPosts',
    async (limit) => {
        console.log('Запрос на получение свежих постов с лимитом:', limit); // Лог
        const freshPosts = await postAPI.fetchFreshPosts(limit);
        console.log('Получены свежие посты:', freshPosts); // Лог
        return freshPosts;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            console.log('Установка текущей страницы:', action.payload); // Лог
            state.posts.currentPage = action.payload;
        },
        setTotalPosts: (state, action) => {
            console.log('Установка общего количества постов:', action.payload); // Лог
            state.posts.totalPosts = action.payload;
        },
        deletePost: (state, action) => {
            const id = action.payload;
            console.log('Удаление поста с ID:', id); // Лог
            state.posts.list = state.posts.list.filter(post => post.id !== id);
            state.freshPosts.posts = state.freshPosts.posts.filter(post => post.id !== id);
            state.postForView.post = null;
        },
        editPost: (state, action) => {
            console.log('Редактирование поста:', action.payload); // Лог
            state.posts.list = state.posts.list.map(post => post.id === action.payload.id ? action.payload : post);
        },
        addPost: (state, action) => {
            const newPost = { ...action.payload };
            newPost.id = new Date().getTime();
            console.log('Добавление нового поста:', newPost); // Лог
            state.posts.list = [newPost, ...state.posts.list];
        },
        showPost: (state, action) => {
            console.log('Просмотр поста:', action.payload); // Лог
            state.postForView = {
                post: action.payload,
                loading: false
            };
        },
        setSortType: (state, action) => {
            console.log('Установка типа сортировки:', action.payload); // Лог
            state.posts.sortType = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostById.pending, (state) => {
                console.log('Запрос на получение поста по ID начат'); // Лог
                state.postForView = { post: null, loading: true };
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                console.log('Запрос на получение поста по ID завершен'); // Лог
                state.postForView = { post: action.payload, loading: false };
            })
            .addCase(getPosts.pending, (state) => {
                console.log('Запрос на получение постов начат'); // Лог
                state.posts.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                console.log('Запрос на получение постов завершен'); // Лог
                state.posts.list = action.payload.posts;
                state.posts.totalPosts = action.payload.total;
                state.posts.loading = false;
            })
            .addCase(getFreshPosts.pending, (state) => {
                console.log('Запрос на получение свежих постов начат'); // Лог
                state.freshPosts.loading = true;
            })
            .addCase(getFreshPosts.fulfilled, (state, action) => {
                console.log('Запрос на получение свежих постов завершен'); // Лог
                state.freshPosts.posts = action.payload;
                state.freshPosts.loading = false;
            });
    }
});

export const { editPost, addPost, showPost, deletePost, setSortType, setCurrentPage, setTotalPosts } = postsSlice.actions;
export default postsSlice.reducer;