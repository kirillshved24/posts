import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typo } from "../../components/ui/Typo";
import { Container } from "../../components/ui/Container";
import { Posts } from "../../components/Posts";
import { getFreshPosts } from "../../redux/slices/postsSlice";
import { Loading } from "../../components/ui/Loading";

export const MainPage = () => {
    const dispatch = useDispatch();

    const isLoaded = useSelector((state) => state.posts.posts.isLoaded);
    const loading = useSelector((state) => state.posts.posts.loading);
    const freshPosts = useSelector((state) => state.posts.freshPosts.posts);
    const postForView = useSelector((state) => state.posts.postForView.post);




    useEffect(() => {
        if (!isLoaded) {
            dispatch(getFreshPosts());
        }
    }, [dispatch, isLoaded]);

    if (loading) {
        return <Container><Loading /></Container>;
    }
    console.log("isLoaded:", isLoaded);
    console.log("loading:", loading);
    return (
        <Container>

            <Typo>Свежие публикации</Typo>
            <Posts posts={freshPosts} />

            {postForView && (
                <>
                    <Typo>Последний просмотренный пост</Typo>
                    <Posts posts={[postForView]} />
                </>
            )}
        </Container>
    );
};