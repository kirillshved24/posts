import React from "react";
import { Posts } from "../../components/Posts";
import { Container } from "../../components/Container";
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
]

export const MainPage = () => (
    <>
        <Container>
            <Typo>Свежие публикации</Typo>
            <Posts posts={INITIAL_POSTS} />
        </Container>
    </>
)