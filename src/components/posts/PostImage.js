
import React from "react"
export const PostImage = (props) => {
    return (
        <>
        {props.post.image_url
        ?
            <div className="post-image-container" onClick={()=> props.history.push(`/posts/${props.post.id}`)}>
                <img
                className="post-image"
                src={props.post.image_url} />
            </div>
        : null
        }
        </>
    )
}
