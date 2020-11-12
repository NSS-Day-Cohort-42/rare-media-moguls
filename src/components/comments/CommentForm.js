import React, { useContext, useState, useEffect, useRef } from "react"
import { CommentContext } from "./CommentProvider"
import "./Comment.css"

export const CommentForm = (props) => {

    const { addComment } = useContext(CommentContext)

    const [comment, setComment] = useState({})

    const handleControlledInputChange = (eve) => {
        const newComment = Object.assign({}, comment)
        newComment[eve.target.name] = eve.target.value
        setComment(newComment)
    }

    const constructNewComment = () => {
        const post_id = props.postId
        if(comment.subject && comment.content){
            const newCommentObject = {
                subject: comment.subject,
                content: comment.content,
                post_id,
                user_id: parseInt(localStorage.getItem("rare_user_id")),
            }
            addComment(newCommentObject)
                .then(props.getCommentsForPost)
        }else{
            window.alert("please fill in all fields")
        } 

    }
    return (

        <form className="form new_comment_form" id="commentForm">
                <div className="form-div">
                    <input type="text" name="subject" required className="form-control" id="subject"
                        proptype="varchar"
                        placeholder="New comment subject"
                        defaultValue={comment.subject}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
                <div className="form-div">
                    <textarea type="text" name="content" required className="form-control comment-content-input" id="content"
                        proptype="varchar"
                        placeholder="What are your thoughts?"
                        defaultValue={comment.content}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewComment()
                        
                }}
                className="btn comment_submit_btn">
                Save Comment
            </button>

        </form>
    )
}