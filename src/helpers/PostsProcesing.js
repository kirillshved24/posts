import React from "react";
import * as SC from './styles'
// Функция сортировки
export const sortPosts = (posts, sortType) => {
    switch (sortType) {
        case 'TITLE_ASC':
            return [...posts].sort((a, b) => a.title.localeCompare(b.title));
        case 'TITLE_DESC':
            return [...posts].sort((a, b) => b.title.localeCompare(a.title));
        default:
            return posts;
    }
};


export const Pagination = ({ totalPosts, limit, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalPosts / limit);

    const handlePageChange = (page) => {
        console.log(`Переключение на страницу: ${page}`); // Лог
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    console.log(`Построение пагинации: текущая страница ${currentPage}, всего страниц ${totalPages}`); // Лог

    return (
        <SC.PaginationContainer>
            {Array.from({ length: totalPages }, (_, i) => (
                <SC.PaginationButton
                    key={i + 1}
                    disabled={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </SC.PaginationButton>
            ))}
        </SC.PaginationContainer>
    );
};