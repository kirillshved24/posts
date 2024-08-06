import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Typo } from "../../../components/Typo";
import { Container } from "../../../components/Container";
import * as SC from './styles'
import { Link } from "../../../components/Link";
import { getPost } from "../../../redux/slices/postsSlice";
export const DetailPostPage = () => {
    const { id } = useParams()
    const postForViea = useSelector((state) => state.posts.postForViea)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost(Number(id)))
    }, [id])

    if (!postForViea) {
        return <>Пост не найден</>
    }
    return <Container>
        <Typo>
            {postForViea.title}
        </Typo>
        <SC.Image src={postForViea.image} alt={postForViea.title} />
        <SC.Text>{postForViea.text}</SC.Text>
        <div style={{ clear: 'both' }} />
        <SC.LinkWrapper>
            <Link to='/posts/'>Обратно к публикациям</Link>
        </SC.LinkWrapper>
    </Container>
}