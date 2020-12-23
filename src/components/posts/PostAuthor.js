import React from "react"
import { Link } from "react-router-dom"
export const PostAuthor = (props) => {
const id = parseInt(props.author.id)
    return (

            <Link
            className="category-label"
            to={{pathname:`/users/${id}`}}>
                <p className="author-name">
                    {props.author.full_name}
                </p>
            </Link>

    )
}


