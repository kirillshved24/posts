
import { Posts } from "../../components/Posts";
import { Container } from "../../components/Container";
import { Typo } from "../../components/Typo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFreshPost } from "../../redux/slices/postsSlice";


export const MainPage = () => {
    const dispatch = useDispatch()

    const postForViea = useSelector((state) => state.posts.postForViea)
    const freshPosts = useSelector((state) => state.posts.freshPosts)


    useEffect(() => {
        dispatch(getFreshPost())
    }, [])

    return <>
        <Container>
            {freshPosts &&
                <>
                    <Typo>Свежие публикации</Typo>
                    <Posts posts={freshPosts} />
                </>
            }
            {postForViea &&
                <>
                    <Typo>Последний просмотренный пост</Typo>
                    <Posts posts={[postForViea]} />
                </>
            }
        </Container>
    </>
}