import React, { useEffect, useMemo } from "react";
import { Container } from "../../components/ui/Container";
import { Posts } from "../../components/Posts";
import { useDispatch, useSelector } from 'react-redux';
import { Typo } from "../../components/ui/Typo";
import { getPosts, setSortType, setCurrentPage, getFreshPosts } from "../../redux/slices/postsSlice";
import { Loading } from "../../components/ui/Loading";
import { Pagination, sortPosts } from "../../helpers/PostsProcesing";


export const PostsPage = () => {
    const dispatch = useDispatch();
    const { list, loading, sortType, currentPage, totalPosts, isLoaded } = useSelector((state) => state.posts.posts);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(getFreshPosts());
        }
        console.log("Загрузка постов: текущая страница =", currentPage);
        dispatch(getPosts({ page: currentPage, limit: 10 }));
    }, [dispatch, currentPage, isLoaded]);;

    const handleSortChange = (e) => {
        console.log("Изменение типа сортировки:", e.target.value);
        dispatch(setSortType(e.target.value));
    };

    const handlePageChange = (page) => {
        console.log("Изменение страницы:", page);
        dispatch(setCurrentPage(page));
    };

    const sortedPosts = useMemo(() => {
        return sortPosts(list, sortType || 'TITLE_ASC');
    }, [list, sortType]);

    if (loading) {
        return <Container><Loading /></Container>;
    }

    return (
        <Container>
            <Typo>Публикации</Typo>
            <div>
                <label htmlFor="sort">Сортировать по:</label>
                <select
                    id="sort"
                    value={sortType}
                    onChange={handleSortChange}
                >
                    <option value="TITLE_ASC">Название (по возрастанию)</option>
                    <option value="TITLE_DESC">Название (по убыванию)</option>
                </select>
            </div>
            <Posts posts={sortedPosts} />
            <Pagination
                totalPosts={totalPosts}
                limit={10}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Container>
    );
};