import React from "react"
import { Link } from "react-router-dom"

export const CreatePostButton = (props) => {
    return(
        <Link
        className="btn newPostbtn"
        to={{pathname: `/new_post/` }}>
            Add Post +
        </Link>
    )
}