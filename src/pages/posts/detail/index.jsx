import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Typo } from "../../../components/ui/Typo";
import { Container } from "../../../components/ui/Container";
import * as SC from './styles';
import { Link } from "../../../components/ui/Link";
import { getPostById, showPost, deletePost, getFreshPosts } from '../../../redux/slices/postsSlice';
import { Modal } from "../../../components/ui/Modal/styles";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";

export const DetailPostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { list } = useSelector((state) => state.posts.posts);
    const postForView = useSelector((state) => state.posts.postForView);
    const { user } = useSelector((state) => state.auth);
    const isLoaded = useSelector((state) => state.posts.posts.isLoaded);

    const [postForDelete, setPostForDelete] = useState(null);
    const showEditAndDeleteBtn = list && user;

    const onDeletePost = async () => {
        if (postForDelete) {
            console.log('Попытка удаления поста с ID:', postForDelete.id);
            try {
                await dispatch(deletePost(postForDelete.id));
                console.log('Пост успешно удален:', postForDelete.id);

                // Обнуляем состояние поста для просмотра после удаления
                dispatch(showPost(null));

                // Перенаправление на список постов после удаления
                navigate('/posts');
            } catch (error) {
                console.error('Ошибка при удалении поста:', error);
            }
        }
    };
    useEffect(() => {
        const intId = Number(id);
        console.log('Преобразованный ID поста в число:', intId);

        const findedPost = list ? list.find((item) => item.id === intId) : undefined;
        console.log('Найденный пост в списке:', findedPost);

        if (findedPost) {
            dispatch(showPost(findedPost));
            console.log('Пост найден в списке и показан:', findedPost);
        } else {
            dispatch(getPostById(intId));
            console.log('Пост не найден в списке, запрошен из API:', intId);
        }
        if (!isLoaded) {
            dispatch(getFreshPosts());
        }
    }, [id, list, dispatch, isLoaded]);


    if (postForView.loading) {
        console.log('Загрузка поста или список постов пуст...');
        return <Container> <Loading /> </Container>;
    }

    if (!postForView.post || !postForView.post.hasOwnProperty('id')) {
        console.log('Пост не найден или не существует в данных.');
        return <Container>Пост не найден</Container>;
    }

    const { post } = postForView;
    const image = post.image || 'https://www.ptichka.ru/data/cache/2018nov/05/46/79609_73338.jpg';
    console.log('Отображаемый пост:', post);

    return (
        <Container>
            {postForDelete && (
                <SC.ModalWrapper>
                    <Modal>
                        <SC.ModalText>
                            Вы точно уверены, что хотите удалить публикацию с ID-{postForDelete.id}?
                        </SC.ModalText>
                        <SC.ModalContent>
                            <SC.DeleteButton onClick={onDeletePost}>Да</SC.DeleteButton>
                            <Button onClick={() => setPostForDelete(null)}>Нет</Button>
                        </SC.ModalContent>
                    </Modal>
                </SC.ModalWrapper>
            )}
            <Typo>{post.title}</Typo>
            <SC.Image src={image} alt={post.title} />
            <SC.Text>{post.body}</SC.Text>
            <SC.LinkWrapper>
                <Link to='/posts/'>Обратно к публикациям</Link>
                {showEditAndDeleteBtn && <Link to={`/posts/${post.id}/edit`}>Редактировать</Link>}
                {showEditAndDeleteBtn && <SC.DeleteButton onClick={() => setPostForDelete(post)}>Удалить</SC.DeleteButton>}
            </SC.LinkWrapper>
        </Container>
    );
};