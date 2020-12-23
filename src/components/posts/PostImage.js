
import React from "react"
export const PostImage = (props) => {
    return (
        <>
        {props.post.image_url
        ?
            <div className="post-image-container">
                <img
                className="post-image"
                src={props.post.image_url} />
            </div>
        : null
        }
        </>
    )
}
