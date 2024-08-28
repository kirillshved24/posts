import React from "react";
import { PostForm } from "../components/PostForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPost, getPosts } from "../../../redux/slices/postsSlice";

const selectPostById = (state, postId) => {
    return (state.posts.posts.list || []).find(post => post.id === postId);
};

export const EditPostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const findedPost = useSelector(state => selectPostById(state, Number(id)));

    const onSubmitForm = async (formValues) => {
        console.log('Отправка формы для редактирования поста:', formValues); // Лог
        await dispatch(editPost(formValues)); // Убедитесь, что editPost возвращает промис
        console.log('Пост отредактирован'); // Лог
        dispatch(getPosts({ page: 1, limit: 10 })); // Обновляем список постов после редактирования
    };

    if (!findedPost) {
        return <>Пост не найден</>;
    }

    return <PostForm title={`Редактирование поста - ${id}`} onSubmitForm={onSubmitForm} defaultValues={findedPost} />;
};