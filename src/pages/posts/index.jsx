import React, { useEffect, useMemo } from "react";
import { Container } from "../../components/ui/Container";
import { Posts } from "../../components/Posts";
import { useDispatch, useSelector } from 'react-redux';
import { Typo } from "../../components/ui/Typo";
import { getPosts, setSortType, setCurrentPage } from "../../redux/slices/postsSlice";
import { Loading } from "../../components/ui/Loading";
import { Pagination, sortPosts } from "../../helpers/PostsProcesing";

export const PostsPage = () => {
    const dispatch = useDispatch();
    const { list, loading, sortType, currentPage, totalPosts } = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(getPosts({ limit: 10 }));
    }, [currentPage, dispatch]);

    const handleSortChange = (e) => {
        dispatch(setSortType(e.target.value));
    };

    const handlePageChange = (page) => {
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