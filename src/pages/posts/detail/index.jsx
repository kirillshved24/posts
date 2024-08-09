import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Typo } from "../../../components/Typo";
import { Container } from "../../../components/Container";
import * as SC from './styles'
import { Link } from "../../../components/Link";
import { getPostById } from '../../../redux/slices/postsSlice'
export const DetailPostPage = () => {
    const { id } = useParams()
    const postForView = useSelector((state) => state.posts.postForView)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPostById(Number(id)))
    }, [id])

    if (postForView.loading) {
        return <Container>Loading...</Container>
    }

    if (!postForView.post || !postForView.post.hasOwnProperty('id')) {
        return <>Пост не найден</>
    }

    const { post } = postForView

    const image = post.image || 'https://www.ptichka.ru/data/cache/2018nov/05/46/79609_73338.jpg'
    return <Container>
        <Typo> {post.title}</Typo>
        <SC.Image src={image} alt={post.title} />
        <SC.Text>{post.body}</SC.Text>
        <div style={{ clear: 'both' }} />
        <SC.LinkWrapper>
            <Link to='/posts/'>Обратно к публикациям</Link>
        </SC.LinkWrapper>
    </Container>
}