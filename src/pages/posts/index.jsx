import React from "react";
import { Container } from "../../components/Container";
import { Posts } from "../../components/Posts";

import { Typo } from "../../components/Typo";

const INITIAL_POSTS = [
    {
        id: 1,
        title: 'Post 1',
        image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg'
    },

    {
        id: 2,
        title: 'Post 2',
        image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg'
    },
    {
        id: 3,
        title: 'Post 3',
        image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg'
    },
    {
        id: 4,
        title: 'Post 4',
        image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg'
    },
    {
        id: 5,
        title: 'Post 5',
        image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg'
    },
]

export const PostsPage = () => <>
    <Container>
        <Typo>Публикации</Typo>
        <Posts posts={INITIAL_POSTS} />
    </Container>
</>
