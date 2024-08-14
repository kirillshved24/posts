import React from "react";
import * as SC from './styles'
import { Link } from "../../../ui/Link";
export const Post = ({ post }) => {
    const image = post.image || 'https://www.ptichka.ru/data/cache/2018nov/05/46/79609_73338.jpg'
    return (
        <SC.Post>
            <SC.Image src={image} alt={post.title} />
            <SC.Title>{post.title}</SC.Title>
            <Link to={`/posts/${post.id}`}>Читать далее...</Link>
        </SC.Post>
    )
}
