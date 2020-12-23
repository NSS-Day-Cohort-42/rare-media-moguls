import React from "react"
import { Link } from "react-router-dom"
export const PostCategory = (props) => {
    const id = parseInt(props.category.id)
    return (
        <>
        <p className="posted-in">
            posted in
        </p>
        <Link
        className="category-label-link"
        to={{pathname:`/posts/category/${id}`}}>
            <p className="category-label-text">
                {props.category.label}
            </p>
        </Link>
        </>
    )
}

