
import React from "react"
import { Link } from "react-router-dom"

export const PostTitle = (props) => {
    return (
        <Link
        className="post-title-link"
        to={{pathname: `/posts/${props.post.id}`}}>
            <p className="post-title-text">
                {props.post.title}
            </p>
        </Link>
    )
}
