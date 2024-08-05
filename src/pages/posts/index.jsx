import React from "react";
import { Container } from "../../components/Container";
import { Posts } from "../../components/Posts";

import { Typo } from "../../components/Typo";

export const INITIAL_POSTS = [
    {
        id: 1,
        title: 'Post 1',
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
        id: 3,
        title: 'Post 3',
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
        id: 5,
        title: 'Post 5',
        image: 'https://bronk.club/uploads/posts/2024-01/1705932163_bronk-club-p-smeshnaya-sova-vkontakte-4.jpg',
        text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum assumenda, tenetur nam porro facilis eveniet sed nisi quo earum, voluptas voluptatum ullam exercitationem odio deleniti similique fugiat! Aperiam, ipsam ab.'
    },
]

export const PostsPage = () => <>

    <Container>
        <Typo>Публикации</Typo>
        <Posts posts={INITIAL_POSTS} />
    </Container>
</>
