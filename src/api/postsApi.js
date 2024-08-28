export const postAPI = {
    fetchPosts(page = 1, limit = 10) {
        console.log(`Запрос списка постов с параметрами: страница = ${page}, лимит = ${limit}`);
        return fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}&_sort=id&_order=desc`)
            .then(response => {
                console.log('Ответ от сервера:', response);
                return response.json().then(posts => {
                    const total = parseInt(response.headers.get('X-Total-Count'), 10);
                    console.log('Полученные посты:', posts);
                    console.log('Общее количество постов:', total);
                    return {
                        posts: posts,
                        total: total
                    };
                });
            });
    },

    fetchFreshPosts(limit = 3) {
        console.log(`Запрос свежих постов с лимитом = ${limit}`);
        return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_sort=id&_order=desc`)
            .then(response => {
                console.log('Ответ от сервера (свежие посты):', response);
                return response.json().then(posts => {
                    console.log('Полученные свежие посты:', posts);
                    return posts;
                });
            });
    },

    fetchById(id) {
        console.log(`Запрос поста по ID = ${id}`);
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                console.log('Ответ от сервера (пост по ID):', response);
                return response.json().then(post => {
                    console.log('Полученный пост:', post);
                    return post;
                });
            });
    }
};