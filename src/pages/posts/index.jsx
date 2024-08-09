import React, { useEffect } from "react";
import { Container } from "../../components/Container";
import { Posts } from "../../components/Posts";
import { useDispatch, useSelector } from 'react-redux'
import { Typo } from "../../components/Typo";
import { getPosts } from "../../redux/slices/postsSlice";


export const PostsPage = () => {
    const { list, loading } = useSelector((state) => state.posts.posts)
    const dispatch = useDispatch()

    console.log(list)

    console.log(loading)

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    if (!list && loading) {
        return <Container>Loading...</Container>
    }

    if (!list) {
        return <>404</>
    }

    return <Container>
        <Typo>Публикации</Typo>
        <Posts posts={list} />
    </Container>
}