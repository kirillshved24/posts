import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Typo } from "../../../components/Typo";
import { Container } from "../../../components/Container";
import * as SC from './styles';
import { Link } from "../../../components/Link";
import { getPostById, showPost } from '../../../redux/slices/postsSlice';

export const DetailPostPage = () => {
    const { id } = useParams();
    const { list } = useSelector((state) => state.posts.posts);
    const postForView = useSelector((state) => state.posts.postForView);
    const dispatch = useDispatch();

    useEffect(() => {
        const intId = Number(id);
        const findedPost = list ? list.find((item) => item.id === intId) : undefined;

        if (findedPost) {
            dispatch(showPost(findedPost));
        } else {
            dispatch(getPostById(intId));
        }
    }, [id, list, dispatch]);

    if (postForView.loading) {
        return <Container>Loading...</Container>;
    }

    if (!postForView.post || !postForView.post.hasOwnProperty('id')) {
        return <Container>Пост не найден</Container>;
    }

    const { post } = postForView;
    const image = post.image || 'https://www.ptichka.ru/data/cache/2018nov/05/46/79609_73338.jpg';

    return (
        <Container>
            <Typo>{post.title}</Typo>
            <SC.Image src={image} alt={post.title} />
            <SC.Text>{post.body}</SC.Text>
            <SC.LinkWrapper>
                <Link to='/posts/'>Обратно к публикациям</Link>
                <Link to={`/posts/ ${post.id}/edit`}>Редактировать</Link>
            </SC.LinkWrapper>
        </Container>
    );
};