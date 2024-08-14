import { Posts } from "../../components/Posts";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFreshPosts } from "../../redux/slices/postsSlice";

export const MainPage = () => {
    const dispatch = useDispatch();

    const postForView = useSelector((state) => state.posts.postForView.post);
    const { posts, loading } = useSelector((state) => state.posts.freshPosts);


    useEffect(() => {
        dispatch(getFreshPosts());
    }, [dispatch]);

    return (
        <Container>
            {loading && <>Loading...</>}
            {posts &&
                <>
                    <Typo>Свежие публикации</Typo>
                    <Posts posts={posts} />
                </>
            }
            {postForView && (
                <>
                    <Typo>Последний просмотренный пост</Typo>
                    <Posts posts={[postForView]} />
                </>
            )}
        </Container>
    );
};