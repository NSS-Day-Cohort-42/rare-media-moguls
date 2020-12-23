// If the post is published it will have a publication date.
// If the post is unpublished, the publication date will be null
// If the current logged in user is the author of the post, the unpublished post will be displayed with the opportunity to publish it.
// If the current logged in user is the author of the post, the published post will be displayed with the opportunity to unpublish it.
import React from "react"

export default (props) => {
    if(props.post.publication_date !== null){
        const date = new Date(props.post.publication_date).toDateString()
        return (
            <>
                <p className="publication-date-text">
                    Publication Date:
                </p>
                <p className="publication-date">
                    {date}
                </p>
            </>
        )
    }
    else if(props.is_author){
        return (
            <p className="unpublished-text">
                Unpublished
            </p>
        )
    }
}