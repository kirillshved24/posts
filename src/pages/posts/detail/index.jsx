import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Typo } from "../../../components/ui/Typo";
import { Container } from "../../../components/ui/Container";
import * as SC from './styles';
import { Link } from "../../../components/ui/Link";
import { getPostById, showPost, deletePost } from '../../../redux/slices/postsSlice';

export const DetailPostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { list } = useSelector((state) => state.posts.posts);
    const postForView = useSelector((state) => state.posts.postForView);


    const [postForDelete, setPostForDelete] = useState(null)

    const onDeletePost = () => {

        dispatch(deletePost(postForDelete))

        setPostForDelete(null)

        navigate('/posts')
    }

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
            {postForDelete &&
                <SC.ModalWrapper>
                    <SC.Modal>
                        <SC.ModalText> Вы  точно уверенны, что хотите удалить публикацию с ID-{postForDelete.id}?</SC.ModalText>
                        <SC.ModalContent>
                            <SC.DeleteButton onClick={onDeletePost}>Да</SC.DeleteButton>
                            <button onClick={() => setPostForDelete(null)}>Нет</button>
                        </SC.ModalContent>
                    </SC.Modal>
                </SC.ModalWrapper>
            }
            <Typo>{post.title}</Typo>
            <SC.Image src={image} alt={post.title} />
            <SC.Text>{post.body}</SC.Text>
            <SC.LinkWrapper>
                <Link to='/posts/'>Обратно к публикациям</Link>
                {list && <Link to={`/posts/ ${post.id}/edit`}>Редактировать</Link>}
                {list && <SC.DeleteButton onClick={() => setPostForDelete(post)}>Удалить</SC.DeleteButton>}
            </SC.LinkWrapper>
        </Container>
    );
};