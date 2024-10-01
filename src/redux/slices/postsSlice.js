import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI } from '../../api/postsApi';

const initialState = {
    posts: {
        list: [],
        loading: false,
        sortType: 'TITLE_ASC',
        currentPage: 1,
        totalPosts: 0,
        isLoaded: false
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
        console.log('Запрос на получение поста по ID:', postId);
        const post = await postAPI.fetchById(postId);
        console.log('Получен пост по ID:', post);
        return post;
    }
);

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async ({ page, limit }, thunkAPI) => {
        try {
            const response = await postAPI.fetchPosts(page, limit);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getFreshPosts = createAsyncThunk(
    'posts/fetchFreshPosts',
    async (limit) => {
        console.log('Запрос на получение свежих постов с лимитом:', limit);
        const freshPosts = await postAPI.fetchFreshPosts(limit);
        console.log('Получены свежие посты:', freshPosts);
        return freshPosts;
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (postId, thunkAPI) => {
        try {
            return postId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.posts.currentPage = action.payload;
        },
        setTotalPosts: (state, action) => {
            console.log('Установка общего количества постов:', action.payload);
            state.posts.totalPosts = action.payload;
        },
        deletePost: (state, action) => {
            const id = action.payload;
            console.log('Удаление поста с ID:', id);
            state.posts.list = state.posts.list.filter(post => post.id !== id);
            state.freshPosts.posts = state.freshPosts.posts.filter(post => post.id !== id);
            state.postForView.post = null;
        },
        editPost: (state, action) => {
            console.log('Редактирование поста:', action.payload);
            state.posts.list = state.posts.list.map(post => post.id === action.payload.id ? action.payload : post);
        },
        addPost: (state, action) => {
            const newPost = { ...action.payload };
            newPost.id = new Date().getTime(); // Генерация уникального ID
            console.log('Добавление нового поста:', newPost);
            state.posts.list = [newPost, ...state.posts.list]; // Добавляем новый пост в начало списка
            state.posts.totalPosts += 1; // Увеличиваем общее количество постов
        },
        showPost: (state, action) => {
            console.log('Просмотр поста:', action.payload);
            state.postForView = {
                post: action.payload,
                loading: false
            };
        },
        setSortType(state, action) {
            state.posts.sortType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostById.pending, (state) => {
                console.log('Запрос на получение поста по ID начат');
                state.postForView = { post: null, loading: true };
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                console.log('Запрос на получение поста по ID завершен');
                state.postForView = { post: action.payload, loading: false };
            })
            .addCase(getPosts.pending, (state) => {
                console.log('Запрос на получение постов начат');
                state.posts.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                console.log('Запрос на получение постов завершен');
                state.posts.list = action.payload.posts;
                state.posts.totalPosts = action.payload.total;
                state.posts.loading = false;
                state.posts.isLoaded = true;
            })

            .addCase(getFreshPosts.pending, (state) => {
                console.log('Запрос на получение свежих постов начат');
                state.freshPosts.loading = true;
            })
            .addCase(getFreshPosts.fulfilled, (state, action) => {
                console.log('Запрос на получение свежих постов завершен');
                state.freshPosts.posts = action.payload;
                state.freshPosts.loading = false;
            })

            .addCase(deletePost.fulfilled, (state, action) => {
                const id = action.payload;

                // Удаляем пост из списка
                state.posts.list = state.posts.list.filter(post => post.id !== id);

                // Обнуляем пост для просмотра
                if (state.postForView.post?.id === id) {
                    state.postForView = { post: null, loading: false };
                }
            });
    }
});

export const { editPost, addPost, showPost, setSortType, setCurrentPage, setTotalPosts } = postsSlice.actions;
export default postsSlice.reducer;