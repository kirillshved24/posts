import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [

        {
            id: 5,
            title: 'Post 5',
            image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg',
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum assumenda, tenetur nam porro facilis eveniet sed nisi quo earum, voluptas voluptatum ullam exercitationem odio deleniti similique fugiat! Aperiam, ipsam ab.'
        },
        {
            id: 4,
            title: 'Post 4',
            image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg',
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum assumenda, tenetur nam porro facilis eveniet sed nisi quo earum, voluptas voluptatum ullam exercitationem odio deleniti similique fugiat! Aperiam, ipsam ab.'
        },
        {
            id: 3,
            title: 'Post 3',
            image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg',
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum assumenda, tenetur nam porro facilis eveniet sed nisi quo earum, voluptas voluptatum ullam exercitationem odio deleniti similique fugiat! Aperiam, ipsam ab.'
        },
        {
            id: 2,
            title: 'Post 2',
            image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg',
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum assumenda, tenetur nam porro facilis eveniet sed nisi quo earum, voluptas voluptatum ullam exercitationem odio deleniti similique fugiat! Aperiam, ipsam ab.'
        },
        {
            id: 1,
            title: 'Post 1',
            image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg',
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum assumenda, tenetur nam porro facilis eveniet sed nisi quo earum, voluptas voluptatum ullam exercitationem odio deleniti similique fugiat! Aperiam, ipsam ab.'
        },

    ],
    postForViea: null,
    freshPosts: null

}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.list = action.payload
        },
        editPost: (state, action) => {

        },
        getPost: (state, action) => {
            state.postForViea = state.list.find((item) => item.id === action.payload)
        },

        getFreshPost: (state) => {
            state.freshPosts = state.list.slice(0, 3)
        },

        addPost: (state, action) => {

        },
    },
})


export const { setPosts, editPost, getPost, addPost, getFreshPost } = postsSlice.actions

export default postsSlice.reducer