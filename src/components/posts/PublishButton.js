import React, { useContext } from "react"
import { PostContext } from './PostProvider'

export const PublishButton = (props) => {
    const { getPostById, publishPost } = useContext(PostContext)
    
    return (
        <button className="btn-small publishBtn"
        onClick={() => {
            publishPost(props.post.id)
            .then(() => getPostById(props.post.id))
        }}>
            {props.post.publication_date === null
            ? "Publish"
            : "Unpublish"
            }
        </button>
    )
}