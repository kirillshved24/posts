import React from "react";
import { PostForm } from "../components/PostForm";
import { addPost, getPosts } from "../../../redux/slices/postsSlice";
import { useDispatch } from "react-redux";

export const AddPostPage = () => {
    const dispatch = useDispatch();

    const onSubmitForm = async (formValues) => {
        console.log('Отправка формы для добавления поста:', formValues);
        await dispatch(addPost(formValues));
        console.log('Пост добавлен');
        dispatch(getPosts({ page: 1, limit: 10 }));
    };

    return <PostForm title='Добавление нового поста' onSubmitForm={onSubmitForm} />;
};