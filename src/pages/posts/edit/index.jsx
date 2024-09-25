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
        console.log('Отправка формы для редактирования поста:', formValues);
        await dispatch(editPost(formValues));
        console.log('Пост отредактирован');
        dispatch(getPosts({ page: 1, limit: 10 }));
    };

    if (!findedPost) {
        return <>Пост не найден</>;
    }

    return <PostForm title={`Редактирование поста - ${id}`} onSubmitForm={onSubmitForm} defaultValues={findedPost} />;
};